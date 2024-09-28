import { brandOptionsMap, categoryOptionsMap } from "@/config";
import PropTypes from "prop-types";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="mx-auto w-full max-w-sm shadow-md transition-all ease-in-out hover:shadow-custom">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="h-[300px] w-full object-cover"
          />
        </div>
        <CardContent>
          <h2 className="mb-2 mt-2 text-xl font-bold">{product?.title}</h2>
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
        <CardFooter className="flex items-center justify-between">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

AdminProductTile.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    salePrice: PropTypes.number,
    price: PropTypes.number,
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  setOpenCreateProductsDialog: PropTypes.func.isRequired,
  setCurrentEditedId: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AdminProductTile;
