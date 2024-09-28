import { Menu } from "lucide-react";

import { useState } from "react";
import { FaShopify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet";
import HeaderRightContent from "./header-right-content";
import MenuItems from "./menu-items";

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleCartOpen() {
    setIsMenuOpen(true);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/shop/home"
          className="flex items-center gap-2 text-gray-800 transition-all ease-in-out hover:text-accentBlue"
        >
          <FaShopify className="h-6 w-6" />
          <span className="font-lg font-bold">Ecommerce</span>
        </Link>
        {/* Mobile menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={handleCartOpen}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md">
            <SheetDescription />
            <MenuItems closeMenu={closeMenu} className="text-2xl" />
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <HeaderRightContent />
      </div>
    </header>
  );
}

export default ShoppingHeader;
