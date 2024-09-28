import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { categoriesWithIcon } from "@/lib/icons";
import { brandsWithIcon } from "@/lib/icons";
import { getFeatureImages } from "@/store/common-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative hidden h-[450px] w-full overflow-hidden sm:h-[600px] md:block xl:h-[800px]">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-gradient transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={slide?.image}
                  alt={slide?.title}
                  className="h-full w-full object-cover object-top"
                />
                <h2 className="container absolute left-[65px] top-[110px] ml-[-20px] flex max-w-[400px] text-4xl font-bold text-gray-700 sm:ml-0 md:left-[100px] md:text-6xl xl:max-w-[800px] xl:text-8xl">
                  {slide?.title}
                </h2>
              </div>
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length,
            )
          }
          className="absolute left-4 top-1/2 hidden -translate-y-1/2 transform bg-white/80 sm:block"
        >
          <ChevronLeftIcon className="ml-[10px] h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length,
            )
          }
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 transform bg-white/80 sm:block"
        >
          <ChevronRightIcon className="ml-[11px] h-4 w-4" />
        </Button>
      </div>

      <div className="container flex items-center justify-center bg-gradient py-[150px] md:hidden">
        <h2 className="flex max-w-[400px] text-4xl font-bold text-gray-700 md:text-6xl xl:max-w-[800px] xl:text-8xl">
          We Picked Every Item With Care, You must try at leact once
        </h2>
      </div>

      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="group cursor-pointer transition-all ease-in-out hover:shadow-custom"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="mb-4 h-12 w-12 text-gray-600 text-primary transition-all ease-in-out group-hover:text-accentBlue" />
                  <span className="font-bold text-gray-600 transition-all ease-in-out group-hover:text-accentBlue">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold">Shop by Brand</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="group cursor-pointer transition-all ease-in-out hover:shadow-custom"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="mb-4 h-12 w-12 text-gray-600 text-primary transition-all ease-in-out group-hover:text-accentBlue" />
                  <span className="font-bold text-gray-600 transition-all ease-in-out group-hover:text-accentBlue">
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productList && productList.length > 0 ? (
              productList
                .slice(0, visibleProducts)
                .map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
          {visibleProducts < productList.length && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 hover:text-white"
                onClick={() => navigate("/shop/listing")}
              >
                See More Products
              </Button>
            </div>
          )}
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
