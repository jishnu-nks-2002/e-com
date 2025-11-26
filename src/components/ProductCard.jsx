import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function ProductCard({ product, index }) {
  const cardRef = useRef();
  const imageRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return; // Disable on mobile
    
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
    if (window.innerWidth < 768) return; // Disable on mobile
    
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
    if (!isHovered || window.innerWidth < 768) return;
    
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
      className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Bestseller Badge */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
        <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
          <span className="text-xs sm:text-sm">⭐</span>
          <span>#{index + 1}</span>
        </div>
      </div>

      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none`}></div>

      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            ref={imageRef}
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 sm:p-5 md:p-6 transition-all duration-300"
          />
          
          {/* Shine effect on hover - desktop only */}
          <div className={`hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000`}></div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-5">
          {/* Category */}
          <div className="mb-1.5 sm:mb-2">
            <span className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 bg-blue-50 text-blue-600 text-[10px] sm:text-xs font-semibold rounded-full">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors min-h-[2.5rem] sm:min-h-[3rem]">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2 sm:mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
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
            <span className="text-[10px] sm:text-xs text-gray-500 ml-0.5 sm:ml-1">
              ({product.rating?.count || 0})
            </span>
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
            </div>
            
            {/* Show button on hover for desktop, always show on mobile */}
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-full md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300 hover:shadow-lg active:scale-95">
              Quick View
            </button>
          </div>
        </div>
      </Link>

      {/* Decorative corner - desktop only */}
      <div className="hidden md:block absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}