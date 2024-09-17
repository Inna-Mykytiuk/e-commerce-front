import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);


  function handleUploadFeatureImage() {
    dispatch(addFeatureImage({
      image: uploadedImageUrl,
      title,
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        setTitle("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);


  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        className="mt-3 p-2 border rounded w-full"
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((feature) => (
            <div
              key={feature._id}
              className="max-h-[300px]">
              <img
                src={feature.image}
                className="w-full h-[300px] object-cover lg:object-contain rounded-t-lg"
              />
              <h2 className="font-bold mt-3 relative top-[-250px] left-0 lg:left-[300px] flex max-w-[200px] md:max-w-[400px] text-2xl pl-8 md:pl-[100px]">{feature.title}</h2>
            </div>
          ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;