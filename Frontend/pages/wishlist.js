import WishlistItem from "@/components/WishlistItem";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <main className="w-full md:py-20">
      <Wrapper>
        {wishlistItems.length > 0 ? (
          <>
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[32px] mb-5 font-semibold leading-tight">
                Wishlist
              </div>
            </div>
            <section className="flex-[2] max-w-[1000px] mx-auto ">
              {wishlistItems.map((item) => (
                <WishlistItem key={item.id} data={item} />
              ))}
            </section>
          </>
        ) : (
          <>
            {/* Empty cart  Screen*/}
            <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
              {/* Empty cart Image  */}
              <Image
                src="/empty-cart.jpg"
                alt="Empty Cart"
                width={300}
                height={300}
                className="w-[300px] md:w-[400px]"
                priority={false}
              />

              {/* Empty cart Message */}
              <span className="text-xl font-bold">Your wishlist is empty</span>
              <span className="text-center mt-4">
                Looks like you have not added anything to your wishlist.
                <br />
                Go ahead and explore top categories.
              </span>

              {/* Link to homepage */}
              <Link
                className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
                href="/"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </Wrapper>
    </main>
  );
};

export default Wishlist;
