"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function DotPattern({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 h-full w-full">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#F3BA2F]/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
} 