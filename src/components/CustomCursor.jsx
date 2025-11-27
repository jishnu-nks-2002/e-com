import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    // Hide default cursor on body
    document.body.style.cursor = "none";

    // Mouse move handler
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // Animate cursor dot (fast follow)
      gsap.to(cursorDot, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Animate cursor outline (slow follow for trail effect)
      gsap.to(cursorOutline, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Hover effect for interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursorOutline, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorDot, {
        scale: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorOutline, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Click effect
    const handleMouseDown = () => {
      gsap.to(cursorOutline, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursorOutline, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="absolute w-2 h-2 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      />

      {/* Cursor Outline */}
      <div
        ref={cursorOutlineRef}
        className="absolute w-8 h-8 border-2 border-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
}