// Bestseller.jsx
import React, { useEffect, useRef } from "react";
import { useProductsState } from "../context/ProductsContext";
import ProductCard from "./ProductCard";
import gsap from "gsap";

export default function Bestseller() {
  const { products } = useProductsState();
  const sectionRef = useRef();
  const titleRef = useRef();

  const bestsellerProducts = products.slice(0, 4);

  useEffect(() => {
    if (bestsellerProducts.length > 0 && sectionRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".bestseller-item"),
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.2)",
        }
      );
    }
  }, [bestsellerProducts.length]);

  if (!bestsellerProducts.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 mb-20"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-40 h-40 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 blur-3xl -z-10"></div>

      {/* Header */}
      <div
        ref={titleRef}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
      >
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-3 mb-2">
            <div className="flex gap-1">
              <span className="text-yellow-500 text-xl sm:text-2xl">⭐</span>
              <span className="text-yellow-500 text-xl sm:text-2xl">⭐</span>
              <span className="text-yellow-500 text-xl sm:text-2xl">⭐</span>
            </div>

            <span className="px-3 py-1 sm:px-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg">
              BEST SELLERS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Top Picks
          </h2>
          <p className="text-gray-600 mt-2 text-base sm:text-lg">
            Customer favorites you'll love
          </p>
        </div>

        <button className="group mx-auto md:mx-0 relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 w-max">
          <span className="relative z-10 flex items-center gap-2">
            View All
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {bestsellerProducts.map((product, index) => (
          <div key={product.id} className="bestseller-item">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
