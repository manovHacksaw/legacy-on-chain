"use client"

import { ArrowRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { AnimatedGradientText } from "./magicui/animated-gradient-text"
import { SparklesText } from "@/components/magicui/sparkles-text"

// Animated background elements
const FloatingOrb = ({ delay = 0, size = 200, position = "top-1/4 left-1/4" }) => (
  <motion.div
    className={`absolute ${position} w-${size} h-${size} bg-[#F3BA2F]/10 rounded-full filter blur-3xl`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      x: [0, 30, 0],
      y: [0, 20, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
)

const AnimatedLine = ({ delay = 0, position = "top-1/2" }) => (
  <motion.div
    className={`absolute ${position} left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F3BA2F]/20 to-transparent`}
    initial={{ opacity: 0, x: "-100%" }}
    animate={{
      opacity: [0, 0.5, 0],
      x: ["-100%", "100%"],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
)

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-[#0F0F0F] to-black flex flex-col items-center justify-center text-center px-4 py-28">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url('/bnb-pattern.png')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F3BA2F]/5 via-transparent to-transparent" />
      
      {/* Animated background orbs */}
      <FloatingOrb size={300} position="top-1/4 left-1/4" delay={0} />
      <FloatingOrb size={400} position="bottom-1/4 right-1/4" delay={2} />
      <FloatingOrb size={250} position="top-1/3 right-1/3" delay={4} />
      
      {/* Animated lines */}
      <AnimatedLine position="top-1/4" delay={0} />
      <AnimatedLine position="top-1/2" delay={1} />
      <AnimatedLine position="bottom-1/4" delay={2} />

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 backdrop-blur-[2px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto space-y-8"
      >
        <div className="flex justify-center">
          <motion.div
            className={cn(
              "group rounded-full border border-[#F3BA2F]/20 bg-[#F3BA2F]/5 backdrop-blur-sm text-[#F3BA2F] transition-all ease-in hover:cursor-pointer hover:bg-[#F3BA2F]/10"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-2 transition ease-out">
              <span className="font-poppins">✨ Powered by BNB Chain</span>
              <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </motion.div>
        </div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent font-poppins">
            Secure Your Legacy
            <br />
            On BNB Chain
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Create smart wills, set milestone-based distributions, and ensure your legacy lives on through BNB Chain. Fast, secure, and eco-friendly.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button
            className="px-8 py-3 rounded-full bg-[#F3BA2F] text-black font-semibold hover:bg-[#F3BA2F]/90 transition-all duration-200 shadow-lg hover:shadow-[#F3BA2F]/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={"/create-will"}>Start Your Will</Link>
          </motion.button>

          <motion.button
            className="px-8 py-3 rounded-full border-2 border-[#F3BA2F] text-[#F3BA2F] font-semibold hover:bg-[#F3BA2F]/10 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={"/claimables"}>Check My Claimables</Link>
          </motion.button>
        </motion.div>

        {/* Testnet notice */}
        <motion.div
          className="mt-8 flex items-center justify-center text-sm rounded-md px-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <AnimatedGradientText className="rounded-3xl">
            <span className="inline-flex items-center">
              <InfoCircledIcon className="mr-2 h-4 w-4 text-[#F3BA2F]" />
              <span className="text-gray-300">
                We're live on the BNB Chain testnet! Some features are still being refined—your feedback is welcome. <br />
                Join us in testing and grab some free <Link href="https://testnet.bnbchain.org/faucet-smart" className="text-[#F3BA2F] hover:underline">BNB Tokens</Link> to get started.
              </span>
            </span>
          </AnimatedGradientText>
        </motion.div>
      </motion.div>

      {/* Interactive cursor effect */}
      <motion.div
        className="fixed w-96 h-96 rounded-full bg-[#F3BA2F]/5 filter blur-3xl pointer-events-none"
        animate={{
          x: [0, 100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}