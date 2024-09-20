import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.price > 0
            ? currentItem?.price
            : currentItem?.salePrice) *
          currentItem?.quantity,
        0
      )
      : 0;

  return (
    <SheetContent className="w-full sm:max-w-md overflow-auto max-h-full">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription />
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
        aria-hidden={false}
      >
        Checkout
      </Button>
    </SheetContent>
  );
}


UserCartWrapper.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.string.isRequired,
      salePrice: PropTypes.number,
      price: PropTypes.number,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  setOpenCartSheet: PropTypes.func.isRequired,
};

export default UserCartWrapper;