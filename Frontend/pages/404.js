import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const FourOhFour = () => {
  const router = useRouter();
  return (
    <main className="relative">
      <div className=" w-[100%]  justify-center items-center hidden xl:flex">
        <img
          src="/404img.jpg"
          alt="404"
          className=""
          style={{ height: "auto", width: "60%" }}
        />
      </div>
      <section className="  xl:absolute z-10 top-0 left-0 right-auto xl:left-auto xl:right-0 h-[60vh] flex flex-col justify-center gap-[20%] pr-4  text-center  xl:text-left x ">
        <div>
          <h1 className="font-extrabold text-6xl my-3">OOPS!</h1>
          <h3 className="font-normal text-xl my-3 ">
            We couldn't find the page you are looking for.
          </h3>
        </div>
        <div className="flex flex-col gap-10">
          <Link
            href="/"
            className="uppercase pb-2  font-medium text-lg underline underline-offset-8 hover:font-semibold hover:underline-offset-[12px] duration-100 active:scale-[97%]"
          >
            Visit Homepage
          </Link>
          <div
            className="uppercase pb-2  font-medium text-lg underline underline-offset-8 hover:font-semibold hover:underline-offset-[12px] duration-100 active:scale-[97%] cursor-pointer"
            onClick={router.back}
          >
            Go back
          </div>
        </div>
      </section>
    </main>
  );
};

export default FourOhFour;
