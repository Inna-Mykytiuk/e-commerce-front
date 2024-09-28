import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "./components/admin-view/layout";
import AuthLayout from "./components/auth/layout";
import CheckAuth from "./components/common/check-auth";
import Loader from "./components/common/loader";
import ShoppingLayout from "./components/shopping-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import PaymentSuccessPage from "./pages/shopping-view/paymant-succes";
import PaypalReturnPage from "./pages/shopping-view/paypall-return";
import SearchProducts from "./pages/shopping-view/search";
import UnauthPage from "./pages/unauth-page";
import { checkAuth } from "./store/auth-slice";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
        }
      />
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>
      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="features" element={<AdminFeatures />} />
      </Route>
      <Route
        path="/shop"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route path="home" element={<ShoppingHome />} />
        <Route path="listing" element={<ShoppingListing />} />
        <Route path="checkout" element={<ShoppingCheckout />} />
        <Route path="account" element={<ShoppingAccount />} />
        <Route path="paypal-return" element={<PaypalReturnPage />} />
        <Route path="payment-success" element={<PaymentSuccessPage />} />
        <Route path="search" element={<SearchProducts />} />
      </Route>
      <Route path="/unauth-page" element={<UnauthPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
