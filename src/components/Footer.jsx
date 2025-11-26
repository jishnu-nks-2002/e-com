import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-gray-900 to-black text-gray-300 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.3),transparent_70%)]"></div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-20"
      >
        {/* 1 — Company Info */}
        <motion.div variants={fadeUp}>
          <h3 className="text-white text-xl font-bold mb-4">Our Store</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Discover premium quality products at unbeatable prices. We deliver excellence to your doorstep.
          </p>

          <div className="flex gap-5">
            {["facebook", "twitter", "instagram"].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-gray-400 hover:text-white transition"
              >
                <i className={`ri-${social}-fill text-2xl`}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 2 — Quick Links */}
        <motion.div variants={fadeUp}>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            {["Home", "Shop", "About Us", "Contact", "Blog"].map((item, i) => (
              <motion.li key={i} whileHover={{ x: 6, color: "#fff" }} className="transition cursor-pointer">
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* 3 — Customer Service */}
        <motion.div variants={fadeUp}>
          <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-gray-400">
            {["FAQ", "Shipping Info", "Returns", "Track Order", "Support"].map(
              (item, i) => (
                <motion.li key={i} whileHover={{ x: 6, color: "#fff" }} className="transition cursor-pointer">
                  {item}
                </motion.li>
              )
            )}
          </ul>
        </motion.div>

        {/* 4 — Newsletter */}
        <motion.div variants={fadeUp}>
          <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe for exclusive offers and updates.
          </p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800 p-2 rounded-xl flex items-center gap-2 border border-gray-700"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold text-sm transition">
              Subscribe
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-t border-gray-800 py-6 text-center text-sm text-gray-500"
      >
        <p>&copy; {currentYear} Our Store. All Rights Reserved.</p>
        <div className="flex justify-center gap-6 mt-3">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
            <motion.a
              key={i}
              whileHover={{ scale: 1.1, color: "#fff" }}
              className="cursor-pointer transition"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
