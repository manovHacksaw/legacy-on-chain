"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[] 
  className?: string
}) => {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(true)  // Set to true initially to make it visible on load
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!

      if (scrollYProgress.get() < 0.05) {
        setVisible(true)  // Make the navbar visible when at the top
      } else {
        setVisible(direction < 0)  // Show the navbar when scrolling down
      }
    }
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}  // Control visibility
        transition={{ duration: 1.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-[#F3BA2F]/20 rounded-full bg-black/80 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className,
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className="relative text-neutral-50 items-center flex space-x-1 group"
          >
            <span className="block sm:hidden transition-transform group-hover:scale-110 text-[#F3BA2F]">{navItem.icon}</span>
            <span className="hidden sm:block text-sm relative">
              {navItem.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F3BA2F] to-[#F3BA2F]/50 transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>
        ))}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="border text-sm font-medium relative border-[#F3BA2F]/20 text-[#F3BA2F] px-4 py-2 rounded-full hover:bg-[#F3BA2F]/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(243,186,47,0.3)]"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            Create Will
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-[#F3BA2F] to-transparent h-px" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                className="absolute right-0 mt-2 w-56 bg-black/90 border border-[#F3BA2F]/20 rounded-lg shadow-xl flex flex-col overflow-hidden backdrop-blur-lg"
              >
                <DropdownItem href="/create-will/simple" text="Create Simple Will" />
                <DropdownItem href="/create-will/customized" text="Create Customized Will" />
                <DropdownItem href="/check-my-will" text="Check My Will" isLast />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

const DropdownItem = ({ href, text, isLast = false }: { href: string; text: string; isLast?: boolean }) => (
  <Link
    href={href}
    className={cn(
      "text-sm text-gray-300 hover:text-[#F3BA2F] transition-all duration-300 py-3 px-5 hover:bg-[#F3BA2F]/5 relative group",
      isLast ? "rounded-b-lg" : "",
      "first:rounded-t-lg",
    )}
  >
    {text}
    <span className="absolute left-0 top-0 w-1 h-0 bg-gradient-to-b from-[#F3BA2F] to-[#F3BA2F]/50 transition-all duration-300 group-hover:h-full" />
  </Link>
)
