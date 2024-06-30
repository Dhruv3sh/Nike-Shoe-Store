import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromAPI } from "@/utils/api";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const maxResults = 3;

const Category = ({ categoryData, categoryProductData, slug }) => {
  const [pageIndex, setPageIndex] = useState(1);

  // Every tine category changes go to page 1
  useEffect(() => {
    setPageIndex(1);
  }, [categoryData]);

  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResults}`,
    fetchDataFromAPI,
    {
      fallbackData: categoryProductData,
    }
  );

  return (
    <main className="w-full md:py-20 relative">
      <Wrapper>
        {/* Heading Section */}
        <section className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <h1 className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight capitalize">
            {categoryData?.data?.[0]?.attributes?.name || slug}
          </h1>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 my-14 px-5 md:px-0">
          {data?.data.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </section>

        {/* Pagination butttons */}
        {data?.meta?.pagination?.total > maxResults && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">
              {`${pageIndex} of ${data && data.meta.pagination.pageCount}`}
            </span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === data?.meta?.pagination?.pageCount}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}

        {/* Loading  */}
        {isLoading && <Loader />}
      </Wrapper>
    </main>
  );
};

export default Category;

export async function getStaticPaths() {
  const categories = await fetchDataFromAPI("/api/categories?populate=*");

  const paths = categories?.data?.map((cat) => ({
    params: {
      slug: cat.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const categoryData = await fetchDataFromAPI(
    `/api/categories?filters[slug][$eq]=${slug}`
  );

  const categoryProductData = await fetchDataFromAPI(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResults}`
  );

  return { props: { categoryData, categoryProductData, slug } };
}
