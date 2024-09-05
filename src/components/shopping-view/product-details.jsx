import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";



function ProductDetailsDialog({ open, setOpen, productDetails }) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    // onOpenChange={handleDialogClose}
    >
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]" aria-describedby={undefined}>
        <div className="relative overflow-hidden rounded-lg">
          <DialogTitle />
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">
              {productDetails?.title}
            </h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            {/* <p
              className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null} */}
            <span
              className={`${productDetails?.salePrice > 0 ? "line-through" : ""} text-3xl font-bold text-primary text-start`}
            >
              {productDetails?.price ? `$${productDetails?.price}` : ""}
            </span>
            {productDetails?.salePrice > 0 ? (
              <span className="text-2xl font-bold text-muted-foreground">${productDetails?.salePrice}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {/* <StarRatingComponent rating={averageReview} /> */}
            </div>
            <span className="text-muted-foreground">
              {/* ({averageReview.toFixed(2)}) */}
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
              // onClick={() =>
              //   handleAddToCart(
              //     productDetails?._id,
              //     productDetails?.totalStock
              //   )
              // }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <Avatar className="w-10 h-10 border">
                <AvatarFallback>
                  {/* {reviewItem?.userName[0].toUpperCase()} */}IO
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">
                    Inna
                    {/* {reviewItem?.userName} */}
                  </h3>
                </div>
                <div className="flex items-center gap-0.5">
                  {/* <StarRatingComponent rating={reviewItem?.reviewValue} /> */}
                  <StarIcon className="w-5 g-6 fill-primary" />
                  <StarIcon className="w-5 g-6 fill-primary" />
                  <StarIcon className="w-5 g-6 fill-primary" />
                  <StarIcon className="w-5 g-6 fill-primary" />
                  <StarIcon className="w-5 g-6 fill-primary" />
                  <span className="text-muted-foreground">(4.5)</span>
                </div>
                <p className="text-muted-foreground">
                  {/* {reviewItem.reviewMessage} */}
                  My review
                </p>
              </div>
              {/* {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )} */}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                {/* <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                /> */}
                <StarIcon className="w-5 g-6 fill-primary" />
                <StarIcon className="w-5 g-6 fill-primary" />
                <StarIcon className="w-5 g-6 fill-primary" />
                <StarIcon className="w-5 g-6 fill-primary" />
                <StarIcon className="w-5 g-6 fill-primary" />

              </div>
              <div className="flex gap-4">
                <Input
                  name="reviewMsg"
                  // value={reviewMsg}
                  // onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Write a review..."
                />
                <Button
                // onClick={handleAddReview}
                // disabled={reviewMsg.trim() === ""}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog;