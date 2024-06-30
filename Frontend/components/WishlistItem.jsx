import {
  addToWishlist,
  deleteFromWishlist,
} from "@/store/slices/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useDispatch } from "react-redux";

const WishlistItem = ({ data }) => {
  const item = data.attributes;
  const dispatch = useDispatch();

  return (
    <div className="flex py-5 gap-3 mf:gap-5  border-b last:border-b-0 ">
      {/* Product Image */}
      <Link
        href={"/product/" + item.slug}
        className="shrink-0 aspect-square w-[50px] md:w-[120px]"
      >
        <Image
          src={item?.thumbnail?.data?.attributes?.url}
          alt={item.slug}
          width={120}
          height={120}
        />
      </Link>

      {/* Product Details */}
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Product Title */}
          <h2 className="text-lg md:text-2xl font-semibold text-black/[.8]">
            {item.name}
          </h2>

          {/* Product Subtitle Mobile */}
          <h3 className="text-sm md:text-md font-medium text-black/[.5] block md:hidden">
            {item.subtitle}
          </h3>

          {/* Product Price */}
          <h3 className="text-sm md:text-md font-bold text-black/[.5] mt-2">
            MRP: &#8377;{item.price}
          </h3>
        </div>

        {/* Product Subtitle Desktop */}
        <h3 className="text-sm md:text-md font-medium text-black/[.5] hidden md:block">
          {item.subtitle}
        </h3>
        <div className=" flex flex-col md:flex-row  md:justify-between ">
          <div className="text-sm">
            {item.description.substring(0, item.description.indexOf(".") + 1)}
          </div>
          {/* Selectors  */}
          <div className="flex items-center md:justify-center my-3 md:my-0  ">
            {/* Delete Btn */}
            {false ? (
              <IoMdHeartEmpty
                className="cursor-pointer text-black/[.5] hover:text-black text-[20px] md:text-[24px]"
                onClick={() => dispatch(addToWishlist({ id: data.id }))}
              />
            ) : (
              <IoMdHeart
                className="cursor-pointer text-red-600  hover:text-red-700 text-[20px] md:text-[24px]"
                onClick={() => dispatch(deleteFromWishlist({ id: data.id }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
