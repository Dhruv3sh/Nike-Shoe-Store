import { updateCart, deleteFromCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

const CartItem = ({ data }) => {
  const item = data.attributes;
  const dispatch = useDispatch();

  // Update cart item fn
  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };

  return (
    <div className="flex py-5 gap-3 mf:gap-5 border-0 border-b last:border-b-0">
      {/* Product Image */}
      <Link
        href={`/product/${item.slug}`}
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

        {/* Selectors  */}
        <div className="flex item justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-blaack/[.5] text-sm md:text-md">
            {/* Size Selector */}
            <div className="flex items-center gap-1">
              {/* label for size selector */}
              <div className="font-semibold">Size:</div>
              {/* dropdown for size selector */}
              <select
                className="hover:text-black bg-white rounded "
                onChange={(e) => updateCartItem(e, "selectedSize")}
              >
                {item.size.data.map((sizeData, index) => (
                  <option
                    key={index}
                    value={sizeData.size}
                    disabled={!sizeData.enabled}
                    selected={data.selectedSize === sizeData.size}
                  >
                    {sizeData.size}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-1">
              {/* label for quantity selector */}
              <div className="font-semibold">Quantity: </div>
              {/* dropdown for quantity selector */}
              <select
                className="hover:text-black bg-white rounded "
                onChange={(e) => updateCartItem(e, "quantity")}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(
                  (elem, index) => (
                    <option
                      selected={data.quantity === elem}
                      key={index}
                      value={elem}
                    >
                      {elem}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Delete Btn */}
          <RiDeleteBin6Line
            className="cursor-pointer text-black/[.5] hover:text-black text-[16px] md:text-[20px]"
            onClick={() => dispatch(deleteFromCart({ id: data.id }))}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
