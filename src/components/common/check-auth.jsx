import PropTypes from "prop-types";

import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  if (!isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated && (location.pathname.includes("/auth") || location.pathname.includes("/register"))) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" state={{ from: location }} replace />
    } else {
      return <Navigate to="/shop/home" state={{ from: location }} replace />
    }
  }

  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" state={{ from: location }} replace />
  }

  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" state={{ from: location }} replace />
  }

  return <>{children}</>

}

CheckAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default CheckAuth;