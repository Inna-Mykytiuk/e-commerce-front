import { configureStore } from "@reduxjs/toolkit";

import adminOrderSlice from "./admin/order-slice";
import adminProductsSlice from "./admin/product-slice";
import authReducer from "./auth-slice";
import commonFeatureSlice from "./common-slice";
import shopAddressSlice from "./shop/address-slice";
import shopCartSlice from "./shop/cart-slice";
import shopOrderSlice from "./shop/order-slice";
import shopProductsSlice from "./shop/products-slice/index.js";
import shopReviewSlice from "./shop/review-slice";
import shopSearchSlice from "./shop/search-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,

    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,

    commonFeature: commonFeatureSlice,
  },
});

export default store;
