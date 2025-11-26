import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative mt-12 sm:mt-16 md:mt-20 bg-gradient-to-b from-gray-900 to-black text-gray-300 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.3),transparent_70%)]"></div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 relative z-20"
      >
        {/* 1 — Company Info */}
        <motion.div variants={fadeUp} className="text-center sm:text-left">
          <h3 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4">Our Store</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 sm:mb-6 max-w-xs mx-auto sm:mx-0">
            Discover premium quality products at unbeatable prices. We deliver excellence to your doorstep.
          </p>

          <div className="flex gap-4 sm:gap-5 justify-center sm:justify-start">
            {["facebook", "twitter", "instagram"].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-gray-400 hover:text-white transition"
                aria-label={social}
              >
                <i className={`ri-${social}-fill text-xl sm:text-2xl`}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 2 — Quick Links */}
        <motion.div variants={fadeUp} className="text-center sm:text-left">
          <h3 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm sm:text-base">
            {["Home", "Shop", "About Us", "Contact", "Blog"].map((item, i) => (
              <motion.li 
                key={i} 
                whileHover={{ x: 6, color: "#fff" }} 
                className="transition cursor-pointer"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* 3 — Customer Service */}
        <motion.div variants={fadeUp} className="text-center sm:text-left">
          <h3 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">Customer Service</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm sm:text-base">
            {["FAQ", "Shipping Info", "Returns", "Track Order", "Support"].map(
              (item, i) => (
                <motion.li 
                  key={i} 
                  whileHover={{ x: 6, color: "#fff" }} 
                  className="transition cursor-pointer"
                >
                  {item}
                </motion.li>
              )
            )}
          </ul>
        </motion.div>

        {/* 4 — Newsletter */}
        <motion.div variants={fadeUp} className="text-center sm:text-left">
          <h3 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">Newsletter</h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 max-w-xs mx-auto sm:mx-0">
            Subscribe for exclusive offers and updates.
          </p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800 p-1.5 sm:p-2 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border border-gray-700"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-gray-300 placeholder-gray-500 focus:outline-none min-w-0"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 sm:px-4 rounded-lg text-white font-semibold text-xs sm:text-sm transition active:scale-95 whitespace-nowrap">
              Subscribe
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-t border-gray-800 py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-500 px-4"
      >
        <p className="mb-2 sm:mb-3">&copy; {currentYear} Our Store. All Rights Reserved.</p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
            <motion.a
              key={i}
              whileHover={{ scale: 1.1, color: "#fff" }}
              className="cursor-pointer transition whitespace-nowrap"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}