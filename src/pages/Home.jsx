import React, { useEffect, useRef, useState } from "react";
import { useProductsState } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";
import Banner from "../components/Banner";
import Bestseller from "../components/Bestseller";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import gsap from "gsap";

export default function Home() {
  const { products, loading, error } = useProductsState();
  const gridRef = useRef();
  const headerRef = useRef();
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(p => selectedCategory === "all" || p.category === selectedCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  useEffect(() => {
    if (!loading && gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.5, ease: "back.out(1.2)" }
      );
    }
  }, [loading, filteredProducts]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      {/* Main Content */}
      <main className="flex-grow ">
        {/* 1. Banner Section */}
        <Banner />

        {/* 2. Bestseller Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Bestseller />
        </div>

        {/* 3. Gallery Section */}
        <Gallery />

        {/* 4. All Products Section */}
       <section className="mb-12 sm:mb-16 md:mb-20 container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
          {/* Background decoration */}
          <div className="absolute -top-10 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 right-0 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full opacity-20 blur-3xl -z-10"></div>

          {/* Header */}
          <div ref={headerRef} className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
              <div>
                <div className="inline-block mb-2 sm:mb-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                  <span className="text-xs sm:text-sm font-semibold text-blue-600">Complete Collection</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                  All Products
                </h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
                </p>
              </div>

              {/* View Toggle - Desktop Only */}
              <div className="hidden lg:flex gap-2 bg-white rounded-full p-1 shadow-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filters and Search Bar */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border border-gray-100">
              {/* Mobile: Stacked Layout */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Search Bar */}
                <div className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                    />
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 active:scale-90 transition-transform"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Category and Sort - Side by Side on Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-2.5 sm:py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none appearance-none bg-white transition-all duration-300 cursor-pointer text-sm sm:text-base"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Sort By */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-2.5 sm:py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none appearance-none bg-white transition-all duration-300 cursor-pointer text-sm sm:text-base"
                    >
                      <option value="default">Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A to Z</option>
                    </select>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {(selectedCategory !== "all" || searchQuery || sortBy !== "default") && (
                <div className="flex flex-wrap gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">Active filters:</span>
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory("all")} className="hover:text-blue-900 active:scale-90 transition-transform">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium max-w-full">
                      <span className="truncate">Search: "{searchQuery}"</span>
                      <button onClick={() => setSearchQuery("")} className="hover:text-purple-900 active:scale-90 transition-transform flex-shrink-0">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {sortBy !== "default" && (
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                      Sorted by: {sortBy}
                      <button onClick={() => setSortBy("default")} className="hover:text-green-900 active:scale-90 transition-transform">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                      setSortBy("default");
                    }}
                    className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium underline active:scale-95 transition-transform"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 md:py-20 bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100">
              <div className="mb-4 sm:mb-6">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg sm:text-xl mb-1 sm:mb-2 font-medium">No products found</p>
              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                  setSortBy("default");
                }}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm sm:text-base font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              ref={gridRef}
              className={`grid gap-4 sm:gap-5 md:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((p, index) => (
                <div key={p.id} className="product-item">
                  <ProductCard product={p} index={index} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 5. Footer Section */}
      <Footer />
    </div>
  );
}