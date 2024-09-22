import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* common header */}
      {/* <ShoppingHeader /> */}
      <main className="flex-1 flex-col w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingLayout;