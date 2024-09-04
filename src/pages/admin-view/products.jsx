import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import CommonForm from "@/components/common/form";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState({ initialFormData });
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  // const { productList } = useSelector((state) => state.adminProducts);
  // const dispatch = useDispatch();
  // const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    // currentEditedId !== null
    //   ? dispatch(
    //     editProduct({
    //       id: currentEditedId,
    //       formData,
    //     })
    //   ).then((data) => {
    //     console.log(data, "edit");

    //     if (data?.payload?.success) {
    //       dispatch(fetchAllProducts());
    //       setFormData(initialFormData);
    //       setOpenCreateProductsDialog(false);
    //       setCurrentEditedId(null);
    //     }
    //   })
    //   : dispatch(
    //     addNewProduct({
    //       ...formData,
    //       image: uploadedImageUrl,
    //     })
    //   ).then((data) => {
    //     if (data?.payload?.success) {
    //       dispatch(fetchAllProducts());
    //       setOpenCreateProductsDialog(false);
    //       setImageFile(null);
    //       setFormData(initialFormData);
    //       toast({
    //         title: "Product add successfully",
    //       });
    //     }
    //   });
  }


  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet open={openCreateProductsDialog} onOpenChange={() => {
        setOpenCreateProductsDialog(false)
      }}>
        <SheetContent side="right" className="overflow-auto" aria-describedby="add-product-description">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <SheetDescription />
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
            // formControls={addProductFormElements}
            // isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default AdminProducts;