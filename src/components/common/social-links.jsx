import { iconComponents } from "@/lib/icons";
import PropTypes from "prop-types";

const SocialLinks = ({ socialLinks }) => {
  return (
    <ul className="grid grid-cols-3 gap-4 text-white">
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
            className="group flex h-full w-full cursor-pointer items-center justify-center transition duration-300 ease-out"
          >
            <a
              href={link.href}
              aria-label={link.ariaLabel}
              className={`flex items-center justify-center ${baseColor} h-[35px] w-[35px] rounded-full bg-white p-1`}
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
