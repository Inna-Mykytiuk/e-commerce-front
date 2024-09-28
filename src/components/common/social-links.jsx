import PropTypes from "prop-types";

import { iconComponents } from "@/lib/icons";

const SocialLinks = ({ socialLinks }) => {
  return (
    <ul className="text-white grid grid-cols-3 gap-4">
      {socialLinks.map((link, index) => {
        const IconComponent = iconComponents[link.icon];

        let baseColor = "text-[#0f172a]";
        let hoverColor = "group-hover:text-gray-500";

        if (link.ariaLabel === "Facebook") {
          hoverColor = "group-hover:text-blue-500";
        } else if (link.ariaLabel === "Instagram") {
          hoverColor = "group-hover:text-pink-600";
        } else if (link.ariaLabel === "LinkedIn") {
          hoverColor = "group-hover:text-blue-500";
        } else if (link.ariaLabel === "Twitter") {
          hoverColor = "group-hover:text-blue-400";
        } else if (link.ariaLabel === "Github") {
          hoverColor = "group-hover:text-gray-500";
        } else if (link.ariaLabel === "Telegram") {
          hoverColor = "group-hover:text-blue-500";
        } else {
          hoverColor = "group-hover:text-gray-500";
        }

        return (
          <li
            key={index}
            className="group flex items-center justify-center cursor-pointer transition duration-300 ease-out w-full h-full"
          >
            <a
              href={link.href}
              aria-label={link.ariaLabel}
              className={`flex items-center justify-center ${baseColor} h-[35px] w-[35px] bg-white p-1 rounded-full`}
            >
              <IconComponent
                className={`h-[25px] w-[25px] ${hoverColor} transition duration-300 ease-out`}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

SocialLinks.propTypes = {
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      ariaLabel: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SocialLinks;
