import PropTypes from "prop-types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { shoppingViewHeaderMenuItems } from "@/config";

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
    <nav className="flex flex-col lg:mb-0 justify-center items-center gap-6 lg:flex-row py-[100px]">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className={cn("text-lg font-medium cursor-pointer transition-all ease-in-out hover:text-accentBlue", className)}
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

MenuItems.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default MenuItems;
