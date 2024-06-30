import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-14  pb-3">
      <Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
        {/* Left */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row ">
          {/* Menu */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Find a store
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Become a partner
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              sign up for email
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              send us feedback
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              student discount
            </div>
          </div>

          {/* Normal Menu */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* Menu */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                get help
              </div>
              <div className="text-sm hover:text-white cursor-pointer text-white/[0.5] ">
                Order Status
              </div>
              <div className="text-sm hover:text-white cursor-pointer text-white/[0.5] ">
                Delivery
              </div>
              <div className="text-sm hover:text-white cursor-pointer text-white/[0.5] ">
                Return
              </div>
              <div className="text-sm hover:text-white cursor-pointer text-white/[0.5] ">
                Payment Options
              </div>
              <div className="text-sm hover:text-white cursor-pointer text-white/[0.5] ">
                Contact Us
              </div>
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                About nike
              </div>
              <div className="text-sm hover:text-white cursor-pointer text-white/[0.5] ">
                News
              </div>
              <div className="text-sm hover:text-white cursor-pointer text-white/[0.5] ">
                Careers
              </div>
              <div className="text-sm hover:text-white cursor-pointer text-white/[0.5] ">
                Investors
              </div>
              <div className="text-sm hover:text-white cursor-pointer text-white/[0.5] ">
                Sustainability
              </div>
            </div>

            {/* Normal Menu End*/}
          </div>
          {/* Left End */}
        </div>

        {/* Right */}
        <div className="flex gap-4 justify-center md:justify-start">
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://facebook.com/"
            className="w-10 h-10 rounded-full bg-white/[.25] flex items-center justify-center text-black hover:bg-white/[.5] cursor-pointer"
          >
            <FaFacebookF size={20} />
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/Vickytooop"
            className="w-10 h-10 rounded-full bg-white/[.25] flex items-center justify-center text-black hover:bg-white/[.5] cursor-pointer"
          >
            <FaTwitter size={20} />
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://youtube.com/@frvicky"
            className="w-10 h-10 rounded-full bg-white/[.25] flex items-center justify-center text-black hover:bg-white/[.5] cursor-pointer"
          >
            <FaYoutube size={20} />
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.instagram.com/vivekchaprana/"
            className="w-10 h-10 rounded-full bg-white/[.25] flex items-center justify-center text-black hover:bg-white/[.5] cursor-pointer"
          >
            <FaInstagram size={20} />
          </Link>
        </div>
        {/* Right End */}
      </Wrapper>
      <Wrapper className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
        {/* Left */}
        <div className="text-[12px] text-white/[.5] hover:text-white cursor-pointer text-center md:text-left">
          &copy; 2023 Nike, Inc. All Rights Reserved
        </div>
        {/* Left End*/}

        {/* Right */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <div className="text-[12px] text-white/[.5] hover:text-white cursor-pointer">
            Guides
          </div>
          <div className="text-[12px] text-white/[.5] hover:text-white cursor-pointer">
            Terms of Sale
          </div>
          <div className="text-[12px] text-white/[.5] hover:text-white cursor-pointer">
            Terms of Use
          </div>
          <div className="text-[12px] text-white/[.5] hover:text-white cursor-pointer">
            Privacy Policy
          </div>
        </div>
        {/* Right End*/}
      </Wrapper>
    </footer>
  );
};

export default Footer;
