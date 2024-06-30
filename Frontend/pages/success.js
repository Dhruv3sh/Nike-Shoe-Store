import Wrapper from "@/components/Wrapper";
import { clearCart } from "@/store/slices/cartSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, []);
  return (
    <main className="min-h-[650px] flex items-center">
      <Wrapper>
        <section className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          <h1 className="text-2xl font-bold">
            Thank you for shopping with us!
          </h1>

          <div className="text-lg font-bold mt-2">
            Your order has been placed successfully.
          </div>

          <div className="text-base mt-5">
            For any product related query, drop an email to
          </div>

          <Link href="mailto:aslinikecontact@nike.com">
            <div className="underline hover:cursor-pointer">
              aslinikecontact@nike.com
            </div>
          </Link>

          <Link href="/" className="font-bold mt-5 cursor-pointer">
            Continue shopping
          </Link>
        </section>
      </Wrapper>
    </main>
  );
};

export default Success;
