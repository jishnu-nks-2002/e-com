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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? "bg-white/70 backdrop-blur-xl shadow-xl" : "bg-white shadow-sm"}
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
          bg-clip-text text-transparent"
        >
          MyShop
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">

          <Link
            to="/"
            className="px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700 font-medium"
          >
            Home
          </Link>

          {isAdmin() ? (
            <>
              <Link
                to="/admin"
                className="px-4 py-2 bg-purple-600 text-white rounded-full hover:shadow-lg"
              >
                Dashboard
              </Link>

              <Link
                to="/add"
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:shadow-lg"
              >
                Add Product
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full"
            >
              Admin Login
            </Link>
          )}

          {/* User badge */}
          {user && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm">{user.username}</span>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">

          <Link
            to="/"
            className="block py-2 text-gray-700 font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {isAdmin() ? (
            <>
              <Link
                to="/admin"
                className="block py-2 text-purple-600 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                to="/add"
                className="block py-2 text-blue-600 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Add Product
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="block w-full text-left py-2 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block py-2 text-blue-600 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Admin Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
