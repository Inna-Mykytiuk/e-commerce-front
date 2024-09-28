import PropTypes from "prop-types";

import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto cursor-pointer shadow-md hover:shadow-custom transition-all ease-in-out">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative h-[350px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover rounded-t-lg object-top"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            {product?.salePrice > 0 ? (
              <span
                className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary text-start`}
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
          <Button className="w-full opacity-60 cursor-not-allowed">
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
