import PropTypes from "prop-types";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-[4px] border-red-900"
          : "border-black"
      }`}
    >
      <CardContent className="grid gap-4 p-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

AddressCard.propTypes = {
  addressInfo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    pincode: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    notes: PropTypes.string,
  }).isRequired,
  handleDeleteAddress: PropTypes.func.isRequired,
  handleEditAddress: PropTypes.func.isRequired,
  setCurrentSelectedAddress: PropTypes.func,
  selectedId: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

export default AddressCard;
