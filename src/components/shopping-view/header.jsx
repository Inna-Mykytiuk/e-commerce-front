import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FaShopify } from "react-icons/fa";

import { LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

import { shoppingViewHeaderMenuItems } from "@/config";

import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetTitle } from "../ui/sheet";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { fetchCartItems } from "@/store/shop/cart-slice";
import UserCartWrapper from "./cart-wrapper";

function MenuItems({ closeMenu, className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
        ? {
          category: [getCurrentMenuItem.id],
        }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      )
      : navigate(getCurrentMenuItem.path);
    closeMenu();
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className={cn("text-base font-medium cursor-pointer", className)}
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>

      ))}
    </nav>
  )
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function handleCartOpen() {
    setOpenCartSheet(true);
  }

  return (
    <div className="flex lg:items-center flex-row gap-4 relative z-40">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={(event) => {
            handleCartOpen();
            event.currentTarget.blur();
          }}
          variant="outline"
          size="icon"
          className="relative"
          aria-hidden="false"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-10px] right-[-10px] font-bold text-sm text-white bg-primary rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")} className="cursor-pointer">
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleCartOpen() {
    setOpenCartSheet(true);
    closeMenu();
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <FaShopify className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
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
            <MenuItems
              closeMenu={closeMenu}
              className="text-2xl"

            />
          </SheetContent>
        </Sheet>

        {/* Desctop Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <HeaderRightContent />
      </div>
    </header>
  )
}

MenuItems.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default ShoppingHeader;