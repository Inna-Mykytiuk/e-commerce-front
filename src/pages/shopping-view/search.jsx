import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import shoppingBag from "../../assets/bags1.jpg";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const [visibleProducts, setVisibleProducts] = useState(8);

  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId,
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

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

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  return (
    <section className="min-h-full w-full flex-col">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8 flex justify-center">
          <div className="flex w-full items-center">
            <Input
              value={keyword}
              name="keyword"
              onChange={(event) => setKeyword(event.target.value)}
              className="py-6 shadow-md placeholder:text-base"
              placeholder="Search Products by brand or name"
            />
          </div>
        </div>
        {!searchResults.length ? (
          <Card className="flex h-screen flex-col items-center border-none pt-[50px]">
            <CardHeader className="mb-8 p-0">
              <CardTitle className="text-4xl">Make Your Choice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-full max-w-[500px] overflow-hidden rounded-full md:h-[500px]">
                <img
                  src={shoppingBag}
                  alt="shopping bag"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </CardContent>
          </Card>
        ) : null}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResults.slice(0, visibleProducts).map((item) => (
            <ShoppingProductTile
              key={item._id}
              handleAddtoCart={handleAddtoCart}
              product={item}
              handleGetProductDetails={handleGetProductDetails}
            />
          ))}
        </div>
        {visibleProducts < searchResults.length && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 hover:text-white"
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </section>
  );
}

export default SearchProducts;
