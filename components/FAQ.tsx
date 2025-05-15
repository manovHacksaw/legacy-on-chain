"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does BNB Chain ensure my will's security?",
    answer:
      "BNB Chain provides immutable, transparent records of your will. Its high-speed performance and EVM compatibility ensure your wishes are securely stored and executed exactly as intended, with minimal risk of tampering or fraud.",
  },
  {
    question: "What are the advantages of creating a will on BNB Chain?",
    answer:
      "BNB Chain offers fast transaction speeds, low costs, and eco-friendly operations. This means your will can be created, updated, and executed quickly and efficiently, with minimal environmental impact and transaction fees.",
  },
  {
    question: "Can I update my will after it's been created on BNB Chain?",
    answer:
      "Yes, our platform allows you to update your will at any time. Changes are recorded on the BNB Chain, ensuring a clear audit trail while maintaining the flexibility to adapt to life changes.",
  },
  {
    question: "How does asset distribution work with a BNB Chain-based will?",
    answer:
      "Assets are distributed according to the conditions set in your will's smart contract. This can include time-based releases, specific event triggers, or instant distribution upon verification of certain conditions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0F0F0F] to-black" />
      <div className="absolute inset-0 bg-[url('/bnb-pattern.png')] opacity-5" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent">
            Frequently Asked Questions
            <br />
            About BNB Chain Wills
          </h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="pb-4">
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-4 px-6 text-lg font-normal bg-black/50 backdrop-blur-md rounded-full border border-[#F3BA2F]/20 shadow-lg transition-all duration-300 hover:bg-[#F3BA2F]/5 hover:scale-105"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedShinyText>
                  <span className="truncate text-[#F3BA2F]">{faq.question}</span>
                </AnimatedShinyText>
                <ChevronDown 
                  className={`w-5 h-5 text-[#F3BA2F] transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: openIndex === index ? 1 : 0,
                  height: openIndex === index ? "auto" : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-gray-300 px-6 mt-2 overflow-hidden bg-black/30 backdrop-blur-sm rounded-lg border border-[#F3BA2F]/10"
              >
                <p className="py-4">{faq.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}