import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import adminProductsSlice from './admin/product-slice';

import shopProductsSlice from "./shop/products-slice/index.js";
import shopCartSlice from "./shop/cart-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
  }
})


export default store;

