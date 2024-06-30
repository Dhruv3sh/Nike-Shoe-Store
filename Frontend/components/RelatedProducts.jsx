import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ relatedProducts }) => {
  const responsive = Object.freeze({
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  });
  return (
    <section className="mt-[50px] mdLmt-[100px] mb-[100px] md:mb-0">
      <h1 className="text-2xl font-bold mb-5">You Might Also Like</h1>
      <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"
      >
        {relatedProducts?.data?.map((prod) => (
          <ProductCard key={prod?.id} data={prod} />
        ))}
      </Carousel>
    </section>
  );
};

export default RelatedProducts;
