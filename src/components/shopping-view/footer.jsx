"use client";

import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import { MdEmail } from "react-icons/md";

import data from "../../data/footer.json";
import SocialLinks from "../common/social-links";

export default function Footer() {
  const {
    title,
    description,
    subtitle,
    socialLinks,
    contacts,
    location,
    phoneNumber,
    email,
    bottomText,
    bottomText1,
    bottomText2,
  } = data;

  return (
    <section className="relative w-full bg-[#0f172a] py-[30px] md:py-[50px]">
      <div className="container">
        <div className="mb-[30px] flex flex-col border-b-[1px] border-white pb-[30px] xl:flex-row xl:pb-[50px]">
          <div className="flex max-w-full flex-col xl:max-w-[40%]">
            <a
              href="#"
              className="font-dancing mb-[30px] text-2xl uppercase text-white"
            >
              {title}
            </a>
            <p className="mb-8 text-xs font-normal leading-7 text-white xl:mb-0">
              {description}
            </p>
          </div>
          <div className="ml-0 flex flex-col justify-center gap-[50px] sm:flex-row xl:ml-auto xl:justify-end">
            <div className="relative z-50">
              <h4 className="font-montserrat mb-[30px] text-center text-base font-normal uppercase text-white sm:text-start">
                {subtitle}
              </h4>
              <SocialLinks socialLinks={socialLinks} />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h4 className="font-montserrat mb-[30px] text-base font-normal uppercase text-white">
                {contacts}
              </h4>
              <p className="mb-4 flex items-center gap-1 text-xs text-white">
                <FaLocationDot />
                {location}
              </p>
              <p className="mb-4 flex items-center gap-1 text-xs text-white">
                <MdEmail />
                {email}
              </p>
              <p className="flex items-center gap-1 text-xs text-white">
                <FaPhoneAlt />
                {phoneNumber}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between sm:flex-row">
          <p className="text-sm text-white">{bottomText}</p>
          <p className="flex items-center text-sm text-white">
            {bottomText1}
            <IoIosHeart className="text-textBlue m-[5px] h-[20px] w-[20px] animate-scale" />
            {bottomText2}
          </p>
        </div>
      </div>
    </section>
  );
}
