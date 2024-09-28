import { brandOptionsMap, categoryOptionsMap } from "@/config";
import PropTypes from "prop-types";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="mx-auto w-full max-w-sm cursor-pointer shadow-md transition-all ease-in-out hover:shadow-custom">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative h-[350px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="h-full w-full rounded-t-lg object-cover object-top"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="mb-2 text-xl font-bold">{product?.title}</h2>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="mb-2 flex items-center justify-between">
            {product?.salePrice > 0 ? (
              <span
                className={`${product?.salePrice > 0 ? "line-through" : ""} text-start text-lg font-semibold text-primary`}
              >
                ${product?.salePrice}
              </span>
            ) : null}
            <span className="text-lg font-bold">
              {product?.price ? `$${product?.price}` : ""}
            </span>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full cursor-not-allowed opacity-60">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

ShoppingProductTile.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    totalStock: PropTypes.number,
    salePrice: PropTypes.number,
    price: PropTypes.number,
    category: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
  }).isRequired,
  handleGetProductDetails: PropTypes.func.isRequired,
  // handleAddtoCart: PropTypes.func.isRequired,
  handleAddtoCart: PropTypes.func,
};

export default ShoppingProductTile;
