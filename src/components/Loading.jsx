import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-gray-200 rounded-full"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-transparent border-t-blue-600 border-r-purple-600 rounded-full animate-spin"></div>
      </div>
      
      <div className="mt-4 sm:mt-5 md:mt-6 text-center">
        <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">Loading...</p>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">Please wait a moment</p>
      </div>
    </div>
  );
}