import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import PropTypes from "prop-types";

import { useEffect, useRef } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data,
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  return (
    <div className={`mt-4 w-full ${isCustomStyling ? "" : "mx-auto max-w-md"}`}>
      <Label className="mb-2 block text-lg font-semibold">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } rounded-lg border-2 border-dashed p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex h-32 cursor-pointer flex-col items-center justify-center`}
          >
            <UploadCloudIcon className="mb-2 h-10 w-10 text-muted-foreground" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="mr-2 h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

ProductImageUpload.propTypes = {
  imageFile: PropTypes.object,
  setImageFile: PropTypes.func.isRequired,
  imageLoadingState: PropTypes.bool.isRequired,
  uploadedImageUrl: PropTypes.string,
  setUploadedImageUrl: PropTypes.func.isRequired,
  setImageLoadingState: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
  isCustomStyling: PropTypes.bool,
};

export default ProductImageUpload;
