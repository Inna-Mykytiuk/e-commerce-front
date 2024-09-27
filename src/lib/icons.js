import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGithubAlt,
  FaTelegramPlane,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import {
  BabyIcon,
  BadgeCheck,
  Footprints,
  ShirtIcon,
  WatchIcon,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";

import { IoWomanOutline } from "react-icons/io5";
import { IoShirtOutline } from "react-icons/io5";
import { SiNike, SiAdidas, SiPuma, SiZara } from "react-icons/si";
import { PiPantsLight } from "react-icons/pi";

export const iconComponents = {
  FaFacebookF,
  AiFillInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaGithubAlt,
  FaTelegramPlane,
};


export const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: IoWomanOutline },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

export const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: SiNike },
  { id: "adidas", label: "Adidas", icon: SiAdidas },
  { id: "puma", label: "Puma", icon: SiPuma },
  { id: "levi", label: "Levi's", icon: PiPantsLight },
  { id: "zara", label: "Zara", icon: SiZara },
  { id: "h&m", label: "H&M", icon: IoShirtOutline },
];

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: ShoppingBasket,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: BadgeCheck,
  },
];