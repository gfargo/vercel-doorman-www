"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface InteractiveImageProps {
  src: string;
  alt: string;
  flow?: React.ReactNode;
}

export function InteractiveImage({ src, alt, flow }: InteractiveImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dampenedX = useSpring(mouseX, { stiffness: 300, damping: 65 });
  const dampenedY = useSpring(mouseY, { stiffness: 300, damping: 65 });

  const rotateX = useTransform(dampenedY, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(dampenedX, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);
  const scale = useTransform(
    dampenedX,
    [-1, 0, 1],
    [0.95, isHovered ? 1.05 : 1, 0.95]
  );

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((event.clientX - centerX) / (rect.width / 2));
      mouseY.set((event.clientY - centerY) / (rect.height / 2));
    }

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        rotateX,
        rotateY,
        scale,
      }}
      className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-lg"
    >
      <div className="w-full h-full inset-0 absolute z-10 flex flex-col items-center justify-center p-8">
        {flow}
      </div>

      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className='relative z-0'
      />
    </motion.div>
  );
}
