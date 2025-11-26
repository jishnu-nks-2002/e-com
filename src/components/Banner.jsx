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
      description: "Discover the hottest trends this season. Exclusive designs crafted for you.",
      buttonText: "Shop Now",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop", // Fashion woman
      bgColor: "from-pink-500 to-rose-500"
    },
    {
      title: "Elegant Style",
      subtitle: "Classic Collection",
      description: "Timeless pieces that never go out of style. Sophistication meets comfort.",
      buttonText: "Explore",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop", // Fashion woman 2
      bgColor: "from-purple-500 to-indigo-500"
    },
    {
      title: "Urban Fashion",
      subtitle: "Street Style 2024",
      description: "Bold and trendy outfits for the modern woman. Express yourself freely.",
      buttonText: "Discover",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop", // Fashion woman 3
      bgColor: "from-blue-500 to-cyan-500"
    },
    {
      title: "Luxury Collection",
      subtitle: "Premium Line",
      description: "Experience luxury with our exclusive high-end fashion collection.",
      buttonText: "View Collection",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop", // Fashion woman 4
      bgColor: "from-amber-500 to-orange-500"
    }
  ];

  useEffect(() => {
    setMounted(true);
    
    // Initial banner animation
    gsap.fromTo(
      bannerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Create cursor trail image pool
    const imagePool = [];
    for (let i = 0; i < 10; i++) {
      const img = document.createElement("div");
      img.className = "cursor-image";
      img.style.cssText = `
        position: absolute;
        width: 120px;
        height: 120px;
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
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        border: 3px solid white;
      `;
      
      img.appendChild(imgElement);
      containerRef.current.appendChild(img);
      imagePool.push(img);
    }
    
    imagesRef.current = imagePool;

    // Auto-play carousel
    startAutoPlay();

    return () => {
      // Cleanup
      imagesRef.current.forEach(img => {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
      });
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change every 4 seconds
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const goToSlide = (index) => {
    stopAutoPlay();
    setActiveSlide(index);
    startAutoPlay();
  };

  // Animate slide changes
  useEffect(() => {
    if (mounted) {
      // Animate text content
      gsap.fromTo(
        ".slide-content",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      );

      // Animate main image
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
      left: x - 60,
      top: y - 60,
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
    })
    .to(img, {
      scale: 0.8,
      opacity: 0,
      y: -30,
      rotation: "+=20",
      duration: 0.6,
      ease: "power2.in",
    }, "+=0.2");
  };

  const handleMouseMove = (e) => {
    if (!mounted) return;
    
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
      className="relative bg-white rounded-lg overflow-hidden mb-12 shadow-lg border border-gray-200"
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgColor} opacity-10 transition-all duration-1000`}></div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative container mx-auto px-6 py-16 md:py-24 min-h-[500px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="slide-content relative z-10">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
              <span className="text-sm font-semibold text-blue-600">{currentSlide.subtitle}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className={`bg-gradient-to-r ${currentSlide.bgColor} bg-clip-text text-transparent`}>
                {currentSlide.title}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-600 leading-relaxed max-w-xl">
              {currentSlide.description}
            </p>
            
            <button className={`bg-gradient-to-r ${currentSlide.bgColor} text-white px-10 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 shadow-lg transform hover:scale-105 hover:-translate-y-1`}>
              {currentSlide.buttonText}
            </button>

            {/* Navigation Dots */}
            <div className="flex gap-3 mt-12">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    activeSlide === index
                      ? `bg-gradient-to-r ${currentSlide.bgColor} w-12 h-3`
                      : "bg-gray-300 w-3 h-3 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Fashion Image */}
          <div className="relative z-10 flex justify-center lg:justify-end">
            <div
              ref={mainImageRef}
              className="relative w-full max-w-md"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              
              {/* Decorative elements around image */}
              <div className={`absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br ${currentSlide.bgColor} opacity-20 rounded-full blur-2xl`}></div>
              <div className={`absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-tr ${currentSlide.bgColor} opacity-20 rounded-full blur-2xl`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 opacity-10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-100 to-blue-100 opacity-10 rounded-full -ml-40 -mb-40 blur-3xl"></div>
    </div>
  );
}