import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMemo } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { makePaymentReq } from "@/utils/api";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, value) => total + value.totalPrice, 0);
  }, [cartItems]);

  const handlePayment = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const res = await makePaymentReq("/api/orders", {
      products: cartItems,
    });

    await stripe.redirectToCheckout({
      sessionId: res.stripeSession.id,
    });
  };

  return (
    <main className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 ? (
          <>
            {/* Heading  */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[32px] mb-5 font-semibold leading-tight">
                Shopping cart
              </div>
            </div>

            {/* Cart Content */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* Cart Items */}
              <section className="flex-[2]">
                <h2 className="text-lg font-bold">Cart Items</h2>
                {cartItems.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </section>

              {/* Cart Sumamry */}
              <section className="flex-1">
                <h2 className="text-lg font-bold">Summary</h2>
                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  {/* Subtotal div */}
                  <div className="flex justify-between">
                    <div className="uppercase text-base md:text-xl font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-base md:text-xl font-medium text-black ">
                      MRP: &#8377;{subTotal}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="text-sm md:text-base py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>

                {/* Checkout Btn */}
                <button
                  onClick={handlePayment}
                  className="flex items-center justify-center gap-5 w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                >
                  Checkout
                  {loading && <img src="/spinner.svg" />}
                </button>
              </section>
            </div>
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
              <span className="text-xl font-bold">Your cart is empty</span>
              <span className="text-center mt-4">
                Looks like you have not added anything in your cart.
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

export default Cart;
