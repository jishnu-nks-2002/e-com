import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Banner() {
  const bannerRef = useRef();
  const containerRef = useRef();
  const imagesRef = useRef([]);
  const currentImageIndex = useRef(0);
  const throttleTimeout = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const autoPlayRef = useRef(null);
  const mainImageRef = useRef();

  // Cursor trail images
  const trailImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
  ];

  // Carousel slides with fashion images and content
  const slides = [
    {
      title: "Summer Collection",
      subtitle: "New Arrivals 2024",
      description: "Discover the hottest trends this season.",
      buttonText: "Shop Now",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop",
      bgColor: "from-pink-500 to-rose-500"
    },
    {
      title: "Elegant Style",
      subtitle: "Classic Collection",
      description: "Timeless pieces that never go out of style.",
      buttonText: "Explore",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
      bgColor: "from-purple-500 to-indigo-500"
    },
    {
      title: "Urban Fashion",
      subtitle: "Street Style 2024",
      description: "Bold and trendy outfits for the modern woman.",
      buttonText: "Discover",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
      bgColor: "from-blue-500 to-cyan-500"
    },
    {
      title: "Luxury Collection",
      subtitle: "Premium Line",
      description: "Experience luxury fashion.",
      buttonText: "View Collection",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
      bgColor: "from-amber-500 to-orange-500"
    }
  ];

  useEffect(() => {
    setMounted(true);

    gsap.fromTo(
      bannerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Cursor trail pool - only on desktop
    if (window.innerWidth >= 768) {
      const imagePool = [];
      for (let i = 0; i < 10; i++) {
        const img = document.createElement("div");
        img.className = "cursor-image";
        img.style.cssText = `
          position: absolute;
          width: 80px;
          height: 80px;
          pointer-events: none;
          opacity: 0;
          z-index: 5;
          will-change: transform, opacity;
        `;

        const imgElement = document.createElement("img");
        imgElement.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 2px solid white;
        `;
        img.appendChild(imgElement);
        containerRef.current.appendChild(img);
        imagePool.push(img);
      }
      imagesRef.current = imagePool;
    }

    startAutoPlay();

    return () => {
      imagesRef.current.forEach(img => {
        if (img.parentNode) img.parentNode.removeChild(img);
      });
      if (throttleTimeout.current) clearTimeout(throttleTimeout.current);
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const goToSlide = (index) => {
    stopAutoPlay();
    setActiveSlide(index);
    startAutoPlay();
  };

  useEffect(() => {
    if (mounted) {
      gsap.fromTo(
        ".slide-content",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      );

      if (mainImageRef.current) {
        gsap.fromTo(
          mainImageRef.current,
          { opacity: 0, scale: 0.8, x: 50 },
          { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "back.out(1.2)" }
        );
      }
    }
  }, [activeSlide, mounted]);

  const showTrailImage = (x, y) => {
    const imagePool = imagesRef.current;
    if (!imagePool.length) return;

    const img = imagePool[currentImageIndex.current % imagePool.length];
    const imgElement = img.querySelector("img");
    const imageUrl = trailImages[currentImageIndex.current % trailImages.length];
    imgElement.src = imageUrl;

    currentImageIndex.current++;

    gsap.killTweensOf(img);

    gsap.set(img, {
      left: x - 40,
      top: y - 40,
      x: 0,
      y: 0,
      scale: 0,
      rotation: gsap.utils.random(-15, 15),
      opacity: 0,
    });

    const tl = gsap.timeline();
    tl.to(img, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(2)",
    }).to(img, {
      scale: 0.8,
      opacity: 0,
      y: -30,
      rotation: "+=20",
      duration: 0.6,
      ease: "power2.in",
    }, "+=0.2");
  };

  const handleMouseMove = (e) => {
    if (!mounted || window.innerWidth < 768) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!throttleTimeout.current) {
      showTrailImage(x, y);
      throttleTimeout.current = setTimeout(() => {
        throttleTimeout.current = null;
      }, 80);
    }
  };

  const currentSlide = slides[activeSlide];

  return (
    <div
  ref={bannerRef}
  className="relative bg-white rounded-lg overflow-hidden mb-8 sm:mb-10 md:mb-12 shadow-lg border border-gray-200 mx-4 sm:mx-6 lg:mx-8 max-w-7xl"
>
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgColor} opacity-10 transition-all duration-1000`}></div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Text */}
          <div className="slide-content relative z-10 text-center lg:text-left">
            <div className="inline-block mb-3 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
              <span className="text-xs sm:text-sm font-semibold text-blue-600">{currentSlide.subtitle}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
              <span className={`bg-gradient-to-r ${currentSlide.bgColor} bg-clip-text text-transparent`}>
                {currentSlide.title}
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-5 sm:mb-6 text-gray-600 leading-relaxed max-w-full lg:max-w-xl mx-auto lg:mx-0">
              {currentSlide.description}
            </p>

            <button className={`bg-gradient-to-r ${currentSlide.bgColor} text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-xl transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95`}>
              {currentSlide.buttonText}
            </button>

            {/* Navigation Dots */}
            <div className="flex gap-2 mt-6 sm:mt-8 justify-center lg:justify-start">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    activeSlide === index
                      ? `bg-gradient-to-r ${currentSlide.bgColor} w-8 sm:w-10 h-2`
                      : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative z-10 flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div
              ref={mainImageRef}
              className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-md"
            >
              {/* Image Container with Fixed Aspect Ratio */}
              <div className="relative w-full" style={{ paddingBottom: '133.33%' }}>
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
                />
              </div>
              
              {/* Decorative blur - smaller on mobile */}
              <div className={`absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br ${currentSlide.bgColor} opacity-20 rounded-full blur-xl sm:blur-2xl pointer-events-none`}></div>
              <div className={`absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-gradient-to-tr ${currentSlide.bgColor} opacity-20 rounded-full blur-xl sm:blur-2xl pointer-events-none`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-100 to-purple-100 opacity-10 rounded-full -mr-24 md:-mr-32 lg:-mr-48 -mt-24 md:-mt-32 lg:-mt-48 blur-3xl pointer-events-none"></div>
      <div className="hidden sm:block absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-to-tr from-pink-100 to-blue-100 opacity-10 rounded-full -ml-24 md:-ml-28 lg:-ml-40 -mb-24 md:-mb-28 lg:-mb-40 blur-3xl pointer-events-none"></div>
    </div>
  );
}