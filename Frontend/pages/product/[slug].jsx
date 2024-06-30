import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import Wrapper from "@/components/Wrapper";
import { addToCart } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/store/slices/wishlistSlice";
import { fetchDataFromAPI } from "@/utils/api";
import { getDiscount, notify } from "@/utils/helper";
import React, { useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ productData, relatedProducts }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const product = productData?.data?.[0]?.attributes;
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  const handleAddingToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      document.getElementById("sizesGrid").scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    } else {
      dispatch(
        addToCart({
          ...productData?.data?.[0],
          selectedSize,
        })
      );
      notify("Item added to cart.");
      setSelectedSize(undefined);
    }
  };

  return (
    <main className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <section className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* Left Column - Prodct Preview Section */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg-mx-0">
            <ProductDetailsCarousel images={product?.image?.data} />
          </div>
          {/* Right Column - Prodct Details Section */}
          <div className="flex-1 py-3">
            {/* Product Tittle */}
            <h1 className="text-[34px] font-semibold mb-2 leading-tight">
              {product.name}
            </h1>

            {/* Product Subtittle */}
            <h2 className="text-lg font-semibold mb-5">{product.subtitle}</h2>

            {/* Product Price */}

            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : &#8377; {product.price}
              </p>
              {product.original_price && (
                <>
                  <p className="text-base font-semibold line-through">
                    &#8377; {product.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscount(product.original_price, product.price)}% off
                  </p>
                </>
              )}
            </div>

            <p className="text-md font-medium text-black/[.5]">
              incl. of taxes
            </p>
            <p className="text-md font-medium text-black/[.5] mb-20">
              &#40;Also includes all applicable duties&#41;
            </p>

            {/* Product Size Selection Section */}
            <div className="mb-10">
              {/* Heading */}
              <div className="flex justify-between mb-2 ">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[.5] cursor-pointer">
                  Select Guide
                </div>
              </div>

              {/* Size Chart */}
              <div className="grid grid-cols-3 gap-2" id="sizesGrid">
                {product.size.data.map((item, index) => (
                  <div
                    key={index}
                    className={`border rounded-md text-center py-3 font-medium  ${
                      item.enabled
                        ? "cursor-pointer hover:border-black"
                        : "cursor-not-allowed bg-black/[.1] opacity-50"
                    }
                    ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      if (item.enabled) {
                        setSelectedSize(item.size);
                        setShowError(false);
                      }
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>

              {/* Error Message */}
              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
            </div>

            {/* Add to Cart button */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={handleAddingToCart}
            >
              Add to Cart
            </button>

            {/* Add to Wishlist button */}

            {wishlistItems.find(
              (item) => item.id === productData?.data?.[0]?.id
            ) ? (
              <button
                onClick={() => {
                  dispatch(
                    deleteFromWishlist({ id: productData?.data?.[0]?.id })
                  );
                }}
                className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 mb-10 hover:opacity-75 "
              >
                Wishlist
                <IoMdHeart className="text-red-600" size={20} />
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(
                    addToWishlist({
                      ...productData?.data?.[0],
                    })
                  );
                }}
                className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 mb-10 hover:opacity-75 "
              >
                Wishlist
                <IoMdHeartEmpty size={20} />
              </button>
            )}

            {/* Product Details */}
            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{product.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        </section>

        <RelatedProducts relatedProducts={relatedProducts} />
      </Wrapper>
    </main>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromAPI("/api/products?populate=*");

  const paths = products?.data?.map((prod) => ({
    params: {
      slug: prod.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const productData = await fetchDataFromAPI(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );

  const relatedProducts = await fetchDataFromAPI(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return { props: { productData, relatedProducts, slug } };
}
