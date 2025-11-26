// ProductCard.jsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function ProductCard({ product, index }) {
  const cardRef = useRef();
  const imageRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Scale up card
    gsap.to(cardRef.current, {
      scale: 1.05,
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      duration: 0.4,
      ease: "power2.out"
    });

    // Zoom and rotate image
    gsap.to(imageRef.current, {
      scale: 1.1,
      rotation: 3,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Reset card
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      duration: 0.4,
      ease: "power2.out"
    });

    // Reset image
    gsap.to(imageRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Bestseller Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
          <span>⭐</span>
          <span>#{index + 1}</span>
        </div>
      </div>

      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none`}></div>

      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            ref={imageRef}
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-6 transition-all duration-300"
          />
          
          {/* Shine effect on hover */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000`}></div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating?.rate || 4)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 fill-current"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating?.count || 0})
            </span>
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
            </div>
            
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:shadow-lg">
              Quick View
            </button>
          </div>
        </div>
      </Link>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}