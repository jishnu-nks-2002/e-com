import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const headerRef = useRef();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const lastScrollY = useRef(0);

  // Hide/Show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > 50);

      if (currentY > lastScrollY.current && currentY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation (GSAP)
  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isVisible]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? "bg-white/70 backdrop-blur-xl shadow-xl" : "bg-white shadow-sm"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          
          {/* Logo */}
          <button
            onClick={() => {
              navigate("/");
              setMobileOpen(false);
            }}
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
              bg-clip-text text-transparent hover:scale-105 transition-transform active:scale-95"
          >
            MyShop
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            <Link 
              className="px-3 py-2 rounded-full hover:bg-gray-100 text-gray-700 font-medium text-sm transition-colors" 
              to="/"
            >
              Home
            </Link>

            {isAdmin() ? (
              <>
                <Link 
                  className="px-3 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 hover:shadow-lg text-sm transition-all" 
                  to="/admin"
                >
                  Dashboard
                </Link>
                <Link 
                  className="px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg text-sm transition-all" 
                  to="/add"
                >
                  Add Product
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="px-3 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:shadow-lg text-sm transition-all active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg text-sm transition-all active:scale-95" 
                to="/login"
              >
                Admin Login
              </Link>
            )}

            {user && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full text-sm">
                <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate font-medium">{user.username}</span>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <Link 
              className="block px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors active:bg-gray-100" 
              to="/" 
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            
            {isAdmin() ? (
              <>
                <Link 
                  className="block px-4 py-2.5 text-purple-600 font-medium hover:bg-purple-50 rounded-lg transition-colors active:bg-purple-100" 
                  to="/admin" 
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  className="block px-4 py-2.5 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors active:bg-blue-100" 
                  to="/add" 
                  onClick={() => setMobileOpen(false)}
                >
                  Add Product
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2.5 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors active:bg-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                className="block px-4 py-2.5 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors active:bg-blue-100" 
                to="/login" 
                onClick={() => setMobileOpen(false)}
              >
                Admin Login
              </Link>
            )}

            {user && (
              <div className="flex items-center gap-3 px-4 py-2.5 bg-blue-50 rounded-lg mx-4 mt-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium truncate">{user.username}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}