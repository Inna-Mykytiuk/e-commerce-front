import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { getFeatureImages } from "@/store/common-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { categoriesWithIcon } from "@/lib/icons";
import { brandsWithIcon } from "@/lib/icons";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";


function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
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
    navigate(`/shop/listing`);
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
      })
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
      })
    );
  }, [dispatch]);


  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <div className="hidden md:block relative w-full h-[450px] sm:h-[600px] overflow-hidden xl:h-[800px]">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
            <div key={index} className={` absolute inset-0 transition-opacity duration-1000 bg-gradient ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
              <img
                src={slide?.image}
                alt={slide?.title}
                className="w-full h-full object-cover object-top"
              />
              <h2 className="container font-bold absolute top-[110px] left-[65px] md:left-[100px] flex max-w-[400px] text-4xl md:text-6xl xl:text-8xl xl:max-w-[800px] text-gray-700 ml-[-20px] sm:ml-0">{slide?.title}</h2>
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
                featureImageList.length
            )
          }
          className="hidden sm:block absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4 ml-[10px]" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hidden sm:block"
        >
          <ChevronRightIcon className="w-4 h-4 ml-[11px]" />
        </Button>
      </div>

      <div className='container bg-gradient flex items-center justify-center md:hidden py-[150px]'>
        <h2 className="font-bold flex max-w-[400px] text-4xl md:text-6xl xl:text-8xl xl:max-w-[800px] text-gray-700">We Picked Every Item With Care, You must try at leact once</h2>
      </div> */}


      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-custom transition-all ease-in-out group"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary text-gray-600 group-hover:text-accentBlue transition-all ease-in-out " />
                  <span className="font-bold text-gray-600 group-hover:text-accentBlue transition-all ease-in-out ">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-custom transition-all ease-in-out group"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary text-gray-600 group-hover:text-accentBlue transition-all ease-in-out " />
                  <span className="font-bold text-gray-600 group-hover:text-accentBlue transition-all ease-in-out ">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.slice(0, visibleProducts).map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
              : <p>No products available.</p>}
          </div>
          {visibleProducts < productList.length && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 hover:text-white"
                onClick={handleLoadMore}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      /> */}
    </div>
  );
}

export default ShoppingHome;