import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import MenuMobile from "./MenuMobile";
import { fetchDataFromAPI } from "@/utils/api";
import { useSelector } from "react-redux";
import Image from "next/image";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const [categories, setCategories] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const handleCategoriesFetch = async () => {
    const res = await fetchDataFromAPI("/api/categories?populate=*");
    setCategories(res.data);
  };

  useEffect(() => {
    handleCategoriesFetch();
  }, []);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
    // eslint-disable-next-line
  }, [lastScrollY]);

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="nike-logo"
            width={60}
            height={60}
            className="w-[40px] md:w-[60px]"
          />
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        {/* Icons Section */}
        <section className="flex items-center gap-2 text-black">
          {/* Wishlist */}
          <Link href="/wishlist">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative ">
              <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
              {wishlistItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {wishlistItems.length}
                </div>
              )}
            </div>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative ">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>

          {/* Mobile Menu */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-16px "
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-20px "
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
        </section>
      </Wrapper>
    </header>
  );
};

export default Header;
