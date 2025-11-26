import React from "react";

export default function Loading() {
  return (
    <div className="p-6 text-center">
      <div className="inline-block animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full w-10 h-10 mb-3"></div>
      <div>Loading...</div>
    </div>
  );
}
