import { getDiscount } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ data: { attributes: productData, id } }) => {
  return (
    <Link
      className="transform overflow-hidden bg-white hover:scale-105 cursor-pointer duration-200"
      href={`/product/${productData.slug}`}
    >
      <Image
        width={500}
        height={500}
        alt={productData.name}
        src={productData.thumbnail.data.attributes.url}
      />
      {/* <img className="w-full" src="/product-1.webp" alt="product1" /> */}
      <section className="p-4 text-black/[.9]">
        <h2 className="text-lg font-medium">{productData.name}</h2>
        <div className="flex items-center text-black/[.5]">
          <p className="mr-2 text-lg font-semibold">
            &#8377;{productData.price}
          </p>
          {productData.original_price && (
            <>
              <p className="text-base font-medium line-through">
                &#8377;{productData.original_price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscount(productData.original_price, productData.price)}%
                off
              </p>
            </>
          )}
        </div>
      </section>
    </Link>
  );
};

export default ProductCard;
