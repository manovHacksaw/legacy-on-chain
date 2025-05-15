"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Clock, Gift, FileSignature, Users, ArrowRight, Sparkles, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const CreateWill = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#0F0F0F] to-black text-white py-16 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/bnb-pattern.png')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F3BA2F]/5 via-transparent to-transparent" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F3BA2F]/10 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F3BA2F]/10 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F3BA2F]/10 text-[#F3BA2F] text-sm mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Secure Your Digital Legacy
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent">
          Choose Your Will Type
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Select the perfect digital will solution to protect your assets on BNB Chain
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full mb-16 relative z-10">
        {/* Standard Will Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="transition-all duration-300"
        >
          <Card className="bg-black/50 backdrop-blur border border-[#F3BA2F]/20 rounded-2xl p-6 shadow-xl hover:shadow-[#F3BA2F]/5 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Shield className="mr-3 text-[#F3BA2F]" /> Standard Will
                </CardTitle>
                <span className="px-3 py-1 bg-[#F3BA2F]/20 text-[#F3BA2F] rounded-full text-sm">
                  Most Popular
                </span>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-white">Free</span>
                <span className="text-gray-400 ml-2">forever</span>
              </div>
              <p className="text-sm text-gray-400">Perfect for individuals with straightforward inheritance needs</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#F3BA2F] mr-3" />
                  <span>Single Beneficiary</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#F3BA2F] mr-3" />
                  <span>10-Year Time Lock</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#F3BA2F] mr-3" />
                  <span>1-Year Cooldown Period</span>
                </div>
              </div>
              <div className="space-y-4 text-gray-200 mb-8">
                <motion.li
                  className="flex items-start"
                  variants={featureVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <FileSignature className="mr-3 mt-1 text-[#F3BA2F] flex-shrink-0" />
                  <span>Immutable Will: Assignments cannot be altered after creation, ensuring the testator's intent is permanent.</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  variants={featureVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <Clock className="mr-3 mt-1 text-[#F3BA2F] flex-shrink-0" />
                  <span>Automated Time Locks: The inheritance is automatically locked after 10 years of inactivity, resettable with the ping() function.</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  variants={featureVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <Gift className="mr-3 mt-1 text-[#F3BA2F] flex-shrink-0" />
                  <span>Financial Safeguards: Assets are held in audited smart contracts until conditions are met.</span>
                </motion.li>
              </div>
              <div className="flex justify-end">
                <Link href="/create-will/simple" passHref>
                  <Button 
                    className="w-full sm:w-auto bg-[#F3BA2F] text-black hover:bg-[#F3BA2F]/90 transition-all duration-200 group"
                  >
                    <span className="flex items-center">
                      Create Will Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Advanced Will Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="transition-all duration-300"
        >
          <Card className="bg-black/50 backdrop-blur border border-[#F3BA2F]/20 rounded-2xl p-6 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Users className="mr-3 text-[#F3BA2F]" /> Milestone Will
                </CardTitle>
                <span className="px-3 py-1 bg-[#F3BA2F]/20 text-[#F3BA2F] rounded-full text-sm">
                  Coming Soon
                </span>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-white">Pro</span>
                <span className="text-gray-400 ml-2">premium features</span>
              </div>
              <p className="text-sm text-gray-400">Advanced inheritance planning for complex scenarios</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#F3BA2F] mr-3" />
                  <span>Multiple Beneficiaries</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#F3BA2F] mr-3" />
                  <span>Custom Vesting Schedules</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#F3BA2F] mr-3" />
                  <span>Conditional Distributions</span>
                </div>
              </div>
              <div className="space-y-4 text-gray-200 mb-8 opacity-70">
                <motion.li
                  className="flex items-start"
                  variants={featureVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Gift className="mr-3 mt-1 text-[#F3BA2F] flex-shrink-0" />
                  <span>Smart Distribution: Configure multiple beneficiaries with custom allocation rules and conditions.</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  variants={featureVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <Clock className="mr-3 mt-1 text-[#F3BA2F] flex-shrink-0" />
                  <span>Time-Based Vesting: Create sophisticated distribution schedules based on time or specific events.</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  variants={featureVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <Shield className="mr-3 mt-1 text-[#F3BA2F] flex-shrink-0" />
                  <span>Enterprise-Grade Security: Immutable beneficiaries & claim validation.</span>
                </motion.li>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  disabled 
                  className="w-full sm:w-auto border-[#F3BA2F]/20 text-[#F3BA2F]/50 hover:bg-[#F3BA2F]/5"
                >
                  <span className="flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Join Waitlist
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-6xl w-full text-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Zap className="w-8 h-8 text-[#F3BA2F] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast & Secure</h3>
            <p className="text-gray-400">Built on BNB Chain for maximum security and speed</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-8 h-8 text-[#F3BA2F] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Audited Smart Contracts</h3>
            <p className="text-gray-400">Your assets are protected by battle-tested code</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-[#F3BA2F] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Modern Interface</h3>
            <p className="text-gray-400">Simple and intuitive user experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWill;