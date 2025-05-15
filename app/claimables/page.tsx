"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSmartWill } from '@/context/SmartWillContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollText, AlertCircle, Clock, Check, Lock, Loader2, FileText, Coins, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { isAddress, ethers } from 'ethers'
import { DotBackground } from '@/components/animateddots'
import { motion } from "framer-motion"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { cn } from "@/lib/utils"

interface Claimable {
  owner: string;
  amount: string;
  description: string;
  lastActiveTime: number;
  claimWaitTime: number;
  beneficiary: string;
}

interface Will {
  owner: string;
  amount: string;
}

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

export default function Claimables() {
  const router = useRouter()
  const {
    account,
    connectWallet,
    loading: walletLoading,
    error: walletError,
    isConnected,
    getNormalWillsAsBeneficiary,
    claimNormalWill,
    getNormalWill,
  } = useSmartWill()

  const [claimables, setClaimables] = useState<Claimable[]>([])
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadClaimables = async () => {
    setLoading(true)
    setError(null)
    try {
      if (!account) {
        setError("No account connected.")
        return
      }

      const wills = await getNormalWillsAsBeneficiary()
      console.log("Fetched wills:", wills)

      const detailedClaimables = await Promise.all(
        wills.map(async (will: Will) => {
          const willDetails = await getNormalWill(will.owner);
          console.log(willDetails)
          return {
            ...will,
            description: willDetails ? willDetails.description : "No description",
            lastActiveTime: Number(willDetails.lastPingTime) * 1000, // Last Ping Time
            claimWaitTime: Number(willDetails.claimWaitTime),
            beneficiary: willDetails.beneficiary
          };
        })
      );
      setClaimables(detailedClaimables || [])
    } catch (err: any) {
      console.error("Error fetching claimables:", err)
      setError(err.message || "Failed to fetch claimables.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClaimables()
  }, [isConnected, account])

  const handleClaim = async (owner: string) => {
    if (!owner || !isAddress(owner)) {
      setError("Invalid owner address.")
      return
    }

    try {
      setClaiming(true)
      setError(null)
      const success = await claimNormalWill(owner)
      if (success) {
        await loadClaimables()
      }
    } catch (err: any) {
      console.error("Error during claim:", err)
      setError(err.message || "Failed to claim.")
    } finally {
      setClaiming(false)
    }
  }

  const isClaimable = (lastActiveTime: number, claimWaitTime: number) => {
    const waitTimeMs = claimWaitTime * 1000
    return Date.now() >= lastActiveTime + waitTimeMs
  }

  const getTimeRemaining = (lastActiveTime: number, claimWaitTime: number) => {
    const endTime = lastActiveTime + (claimWaitTime * 1000)
    if (isNaN(endTime)) {
      return "Invalid Date"
    }
    return formatDistanceToNow(endTime, { addSuffix: true })
  }

  if (!isConnected) {
    return (
      <DotBackground>
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-[#0F0F0F] to-black flex items-center justify-center text-center px-4 py-28">
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
            className="relative z-10"
          >
            <Card className="w-full max-w-md bg-black/50 backdrop-blur-sm border-[#F3BA2F]/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-display bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent">Connect Wallet</CardTitle>
                <CardDescription className="text-gray-400">Please connect your wallet to view claimables</CardDescription>
              </CardHeader>
              <CardContent className="p-4 flex justify-center">
                <motion.button
                  onClick={connectWallet}
                  disabled={walletLoading}
                  className={cn(
                    "px-8 py-3 rounded-full bg-[#F3BA2F] text-black font-semibold hover:bg-[#F3BA2F]/90 transition-all duration-200 shadow-lg hover:shadow-[#F3BA2F]/20",
                    walletLoading && "opacity-50 cursor-not-allowed"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {walletLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    'Connect Wallet'
                  )}
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </DotBackground>
    )
  }

  if (loading) {
    return (
      <DotBackground>
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-[#0F0F0F] to-black flex items-center justify-center text-center px-4 py-28">
          {/* Background elements */}
          <div className="absolute inset-0 bg-[url('/bnb-pattern.png')] opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F3BA2F]/5 via-transparent to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <Card className="w-full max-w-md bg-black/50 backdrop-blur-sm border-[#F3BA2F]/20">
              <CardContent className="flex items-center justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-[#F3BA2F]" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </DotBackground>
    )
  }

  return (
    <DotBackground>
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-[#0F0F0F] to-black text-white py-6">
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

        <div className="container mx-auto p-6 max-w-4xl space-y-6 relative z-10">
          {(error || walletError) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive" className="bg-red-800/50 backdrop-blur-sm text-white rounded-md shadow-md border-red-500/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error || walletError}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-black/50 backdrop-blur-sm border-[#F3BA2F]/20 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-display bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent">Your Claimable Assets</CardTitle>
                <CardDescription className="text-gray-400">
                  View and manage academic assets designated to you
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {claimables.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-black/50 backdrop-blur-sm border-[#F3BA2F]/20">
                <CardContent className="p-6 text-center text-gray-400">
                  No claimable assets found for your address
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {claimables.map((claimable, index) => {
                const isReadyToClaim = isClaimable(claimable.lastActiveTime, claimable.claimWaitTime)
                const timeRemaining = getTimeRemaining(claimable.lastActiveTime, claimable.claimWaitTime)

                return (
                  <motion.div
                    key={`${claimable.owner}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-black/50 backdrop-blur-sm border-[#F3BA2F]/20 hover:border-[#F3BA2F]/40 transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-xl font-display bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent">
                              {claimable.description || "Academic Legacy"}
                            </CardTitle>
                            <CardDescription className="text-gray-400 flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Legacy from: {claimable.owner}
                            </CardDescription>
                            <CardDescription className="text-gray-400 flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Beneficiary: {claimable.beneficiary}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="font-display text-2xl text-[#F3BA2F]">{claimable.amount} BNB</div>
                            <CardDescription className="text-gray-400">Token Amount</CardDescription>
                          </div>
                        </div>
                        <CardContent className="mt-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Claim Available: {isReadyToClaim ?
                              <span className="text-green-500 font-semibold">Now!</span> :
                              <span className="text-yellow-500 font-semibold">{timeRemaining}</span>
                            }
                          </div>
                        </CardContent>
                        <CardFooter className="mt-4">
                          <motion.button
                            onClick={() => handleClaim(claimable.owner)}
                            disabled={claiming || !isReadyToClaim}
                            className={cn(
                              "px-8 py-3 rounded-full bg-[#F3BA2F] text-black font-semibold hover:bg-[#F3BA2F]/90 transition-all duration-200 shadow-lg hover:shadow-[#F3BA2F]/20",
                              (claiming || !isReadyToClaim) && "opacity-50 cursor-not-allowed"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {claiming ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Claiming...
                              </>
                            ) : (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Claim
                              </>
                            )}
                          </motion.button>
                        </CardFooter>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DotBackground>
  )
}