import { Outlet } from "react-router-dom";

import Footer from "./footer";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      {/* common header */}
      <ShoppingHeader />
      <main className="w-full flex-1 flex-col overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingLayout;
