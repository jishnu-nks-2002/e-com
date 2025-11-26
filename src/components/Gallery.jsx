import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    title: "Fashion Collection",
    description: "Explore our latest trends",
    category: "Fashion",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    title: "Summer Essentials",
    description: "Beat the heat in style",
    category: "Lifestyle",
    color: "from-orange-500 to-amber-500"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93",
    title: "Tech & Gadgets",
    description: "Innovation at your fingertips",
    category: "Technology",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    title: "Premium Audio",
    description: "Sound that moves you",
    category: "Audio",
    color: "from-purple-500 to-indigo-500"
  },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef();
  const mainImageRef = useRef();
  const thumbnailsRef = useRef([]);

  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  useEffect(() => {
    // Animate main image with scale and fade
    if (mainImageRef.current) {
      gsap.fromTo(
        mainImageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    // Highlight active thumbnail
    thumbnailsRef.current.forEach((thumb, index) => {
      if (thumb) {
        gsap.to(thumb, {
          scale: index === currentIndex ? 1 : 0.95,
          opacity: index === currentIndex ? 1 : 0.7,
          duration: 0.3
        });
      }
    });
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
  <section ref={sectionRef} className="mb-12 sm:mb-16 md:mb-20 relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Background decoration */}
      <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 blur-3xl -z-10"></div>

      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10 text-center lg:text-left">
        <div className="inline-block mb-2 sm:mb-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
          <span className="text-xs sm:text-sm font-semibold text-blue-600">Curated Collections</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1 sm:mb-2">
          Featured Gallery
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">Discover what's trending now</p>
      </div>

      {/* Thumbnail Row at Top */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            ref={(el) => (thumbnailsRef.current[index] = el)}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative group rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 h-24 sm:h-28 md:h-32 ${
              index === currentIndex 
                ? "ring-2 sm:ring-4 ring-blue-500 shadow-xl scale-105" 
                : "hover:ring-2 hover:ring-gray-300 hover:scale-105"
            }`}
          >
            {/* Thumbnail image */}
            <img
              src={`${image.url}?auto=format&fit=crop&w=400&q=80`}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
              hoveredIndex === index || index === currentIndex ? "opacity-100" : "opacity-60"
            }`}></div>

            {/* Color accent */}
            <div className={`absolute inset-0 bg-gradient-to-br ${image.color} opacity-20 mix-blend-overlay`}></div>

            {/* Content */}
            <div className="absolute inset-0 p-2 sm:p-3 flex flex-col justify-end">
              <div className={`transition-all duration-300 ${index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`}>
                <span className={`inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gradient-to-r ${image.color} text-white text-[10px] sm:text-xs font-bold rounded-full mb-0.5 sm:mb-1`}>
                  {image.category}
                </span>
                <h4 className="text-white font-bold text-[10px] sm:text-xs line-clamp-1">
                  {image.title}
                </h4>
              </div>
            </div>

            {/* Active indicator */}
            {index === currentIndex && (
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
            )}
          </button>
        ))}
      </div>

      {/* Main Featured Image Below */}
      <div className="relative group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        {/* Main Image */}
        <div ref={mainImageRef} className="absolute inset-0">
          <img
            src={`${galleryImages[currentIndex].url}?auto=format&fit=crop&w=1400&q=80`}
            alt={galleryImages[currentIndex].title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
          <div className={`absolute inset-0 bg-gradient-to-br ${galleryImages[currentIndex].color} opacity-20 mix-blend-overlay`}></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12 z-10">
          {/* Category badge */}
          <div className="mb-2 sm:mb-3 md:mb-4">
            <span className={`inline-block px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 bg-gradient-to-r ${galleryImages[currentIndex].color} text-white text-xs sm:text-sm md:text-base font-bold rounded-full shadow-lg`}>
              {galleryImages[currentIndex].category}
            </span>
          </div>

          {/* Title and description */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 transform transition-all duration-300">
            {galleryImages[currentIndex].title}
          </h3>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-2xl">
            {galleryImages[currentIndex].description}
          </p>

          {/* CTA Button */}
          <div>
            <button className="group/btn px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white text-gray-900 rounded-full text-sm sm:text-base font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 w-fit">
              Explore Collection
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 flex items-center justify-center z-20 active:scale-90"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 flex items-center justify-center z-20 active:scale-90"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/20 z-20">
          <div
            className={`h-full bg-gradient-to-r ${galleryImages[currentIndex].color} transition-all`}
            style={{
              width: isAutoPlaying ? '100%' : '0%',
              transition: isAutoPlaying ? 'width 5s linear' : 'width 0.3s'
            }}
          />
        </div>

        {/* Slide counter */}
        <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-xs sm:text-sm z-20">
          {currentIndex + 1} / {galleryImages.length}
        </div>
      </div>
    </section>
  );
}