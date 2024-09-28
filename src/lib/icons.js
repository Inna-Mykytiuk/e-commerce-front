import { BabyIcon, Footprints, ShirtIcon, WatchIcon } from "lucide-react";

import { AiFillInstagram } from "react-icons/ai";
import {
  FaFacebookF,
  FaGithubAlt,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { IoWomanOutline } from "react-icons/io5";
import { IoShirtOutline } from "react-icons/io5";
import { PiPantsLight } from "react-icons/pi";
import { SiAdidas, SiNike, SiPuma, SiZara } from "react-icons/si";

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
