"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconMessage, IconUser, IconFileText, IconSearch } from "@tabler/icons-react";
import Link from "next/link";

export default function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-[#F3BA2F]" />,
    },
    {
      name: "Create Will",
      link: "/create-will",
      icon: <IconFileText className="h-4 w-4 text-[#F3BA2F]" />,
    },
    {
      name: "Check Will",
      link: "/check-my-will",
      icon: <IconSearch className="h-4 w-4 text-[#F3BA2F]" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-[#F3BA2F]" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <IconMessage className="h-4 w-4 text-[#F3BA2F]" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav 
        navItems={navItems}
        className="border-[#F3BA2F]/20 bg-black/50 backdrop-blur-lg"
      />
    </div>
  );
}
