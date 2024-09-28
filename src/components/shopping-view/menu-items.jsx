import { shoppingViewHeaderMenuItems } from "@/config";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Label } from "../ui/label";

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
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`),
        )
      : navigate(getCurrentMenuItem.path);
    if (typeof closeMenu === "function") {
      closeMenu();
    }
  }

  return (
    <nav className="flex flex-col items-center justify-center gap-6 py-[100px] lg:mb-0 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className={cn(
            "cursor-pointer text-lg font-medium transition-all ease-in-out hover:text-accentBlue",
            className,
          )}
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

MenuItems.propTypes = {
  closeMenu: PropTypes.func,
  className: PropTypes.string,
};

export default MenuItems;
