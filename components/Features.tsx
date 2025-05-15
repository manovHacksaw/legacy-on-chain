"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { HelpCircle, BookOpen, FileText, FileSearch, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BentoGridCustomDemo() {
  return (
    <div className="py-20 relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('/bnb-pattern.png')] opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-text-[#F3BA2F]" />
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent font-poppins`">
            Powered by BNB Chain
          </h2>
          <p className="text-[#b8b8ff] text-lg font-medium">Advanced features for complete control over your digital legacy</p>
        </div>
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem] grid gap-8">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.7 }}
                  className="bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent font-poppins font-bold tracking-tight text-xl md:text-2xl"
                >
                  {item.title}
                </motion.span>
              }
              description={
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * i + 0.2, duration: 0.7 }}
                  className="bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent font-poppins tracking-tight text-base md:text-lg"
                >
                  {item.description}
                </motion.span>
              }
              header={item.header}
              className={cn("[&>p:text-lg] p-6 md:rounded-3xl bg-white/10 backdrop-blur-lg border border-[#a259ff]/30 shadow-[0_4px_32px_0_rgba(67,231,173,0.15)] hover:shadow-[0_8px_40px_0_rgba(162,89,255,0.25)] transition-shadow duration-300", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: {
      x: 10,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

  const variantsSecond = {
    initial: { x: 0 },
    animate: {
      x: -10,
      rotate: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-[#F3BA2F]/20 p-2 items-center space-x-2 bg-black/50 backdrop-blur-sm"
      >
        <div className="h-6 w-6 rounded-full bg-[#F3BA2F] flex-shrink-0" />
        <div className="w-full bg-[#F3BA2F]/10 h-4 rounded-full" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-[#F3BA2F]/20 p-2 items-center space-x-2 w-3/4 ml-auto bg-black/50 backdrop-blur-sm"
      >
        <div className="w-full bg-[#F3BA2F]/10 h-4 rounded-full" />
        <div className="h-6 w-6 rounded-full bg-[#F3BA2F] flex-shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-[#F3BA2F]/20 p-2 items-center space-x-2 bg-black/50 backdrop-blur-sm"
      >
        <div className="h-6 w-6 rounded-full bg-[#F3BA2F] flex-shrink-0" />
        <div className="w-full bg-[#F3BA2F]/10 h-4 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => (
  <div className="relative w-full h-full overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-[#F3BA2F]/20 to-transparent" />
    <Image
      src="https://i.pinimg.com/originals/8f/2e/a2/8f2ea20af094616662530c48c4f6d561.gif"
      alt="Low cost operations"
      height="2000"
      width="2000"
      className="max-h-44 w-full object-cover"
    />
  </div>
);

const SkeletonThree = () => (
  <div className="relative w-full h-full overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-[#F3BA2F]/20 to-transparent" />
    <Image
      src="https://i.pinimg.com/736x/65/cc/20/65cc2068aea4a5d05f656dafc1bdeb63.jpg"
      alt="EVM compatibility"
      height="2000"
      width="2000"
      className="max-h-44 w-full object-cover"
    />
  </div>
);

const SkeletonFour = () => (
  <div className="relative w-full h-full overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-[#F3BA2F]/20 to-transparent" />
    <Image
      src="https://i.pinimg.com/originals/0e/1c/a4/0e1ca4afba2b94a1d0391324c60d2a25.gif"
      alt="Eco friendly"
      height="5000"
      width="2000"
      className="max-h-44 w-full object-cover"
    />
  </div>
);

const SkeletonFive = () => (
  <div className="relative w-full h-full overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-[#F3BA2F]/20 to-transparent" />
    <Image
      src="https://i.pinimg.com/originals/e0/e2/3d/e0e23d98d1e94c1a2b8d408d7bada31f.gif"
      alt="Data transparency"
      height="5000"
      width="2000"
      className="max-h-44 w-full object-cover"
    />
  </div>
);

const items = [
  {
    title: "Fast Transactions",
    description: "Execute wills and distribute assets with BNB Chain's lightning-fast block time.",
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Zap className="h-6 w-6 text-[#43e7ad] drop-shadow-[0_0_8px_#43e7ad]" />,
  },
  {
    title: "Low-Cost Operations",
    description: "Benefit from BNB Chain's minimal transaction fees for cost-effective legacy management.",
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <BookOpen className="h-6 w-6 text-[#a259ff] drop-shadow-[0_0_8px_#a259ff]" />,
  },
  {
    title: "EVM Compatibility",
    description: "Leverage Ethereum-compatible smart contracts for flexible and powerful will creation.",
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <FileText className="h-6 w-6 text-[#f3ba2f] drop-shadow-[0_0_8px_#f3ba2f]" />,
  },
  {
    title: "Eco-Friendly",
    description: "Rest easy knowing your digital legacy has a minimal environmental impact on BNB Chain.",
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <Shield className="h-6 w-6 text-[#43e7ad] drop-shadow-[0_0_8px_#43e7ad]" />,
  },
  {
    title: "Data Transparency",
    description: "Every transaction is recorded on the BNB Chain blockchain for complete transparency.",
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <FileSearch className="h-6 w-6 text-[#a259ff] drop-shadow-[0_0_8px_#a259ff]" />,
  },
];
