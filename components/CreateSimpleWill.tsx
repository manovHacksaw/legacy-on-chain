"use client"

import { useEffect, useState, useCallback } from "react"
import { isAddress } from "ethers"
import { useSmartWill } from "@/context/SmartWillContext"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollText, AlertCircle, Info, Clock, GraduationCap, BookOpen, Loader2, Wallet, ArrowRight, Shield, Lock, CheckCircle2, Sparkles, Zap, Coins, FileText, UserCheck } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { AnimatedShinyText } from "./magicui/animated-shiny-text"
import { IconArrowLeft } from "@tabler/icons-react"
import { DotBackground } from "./animateddots"
import { motion } from "framer-motion"

export default function CreateSimpleWill() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    beneficiary: "",
    assets: "",
    amount: "",
    claimWaitTime: "",
  })
  const [validationError, setValidationError] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [checkingWill, setCheckingWill] = useState(true)
  const [hasWill, setHasWill] = useState(false)

  // Add this near the other state declarations at the top
  const [transactionHash, setTransactionHash] = useState("")
  const [creatingWill, setCreatingWill] = useState(false)
  const [waitingForSignature, setWaitingForSignature] = useState(false)

  const [confirmationChecks, setConfirmationChecks] = useState({
    termsAccepted: false,
    understandInactivity: false,
    understandFees: false,
    confirmBeneficiary: false,
    createBackup: false,
    allowDistribution: false,
    understandLock: false,
    acceptRisks: false,
  })

  const {
    account,
    balance,
    connectWallet,
    createNormalWill,
    loading,
    error,
    isConnected,
    hasCreatedWill,
    chainId,
  } = useSmartWill()

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
  }, [isConnected])

  // Check Will Status Effect - Moved to useCallback for correct memoization
  const checkWillStatus = useCallback(async () => {
    if (account && isConnected) {
      setCheckingWill(true)
      try {
        const willExists = await hasCreatedWill(account)
        setHasWill(willExists)
        if (willExists) {
          router.push('/check-my-will/simple')
        }
      } catch (error) {
        console.error("Error checking will status:", error)
      } finally {
        setCheckingWill(false)
      }
    } else {
      setCheckingWill(false)
    }
  }, [account, isConnected, router, hasCreatedWill])

  useEffect(() => {
    checkWillStatus()  // Call the memoized function
  }, [])

  // Handle Submit Effect
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isConnected) {
      await connectWallet()
      return
    }
    if (!validateForm()) return

    try {
      setCreatingWill(true)
      setWaitingForSignature(true)
      setTransactionHash("") // Reset transaction hash before starting

      // Add balance check
      const requiredAmount = Number(formData.amount)
      if (Number(balance) < requiredAmount) {
        throw new Error(`Insufficient balance. You need ${requiredAmount} BNB but have ${Number(balance).toFixed(4)} BNB`)
      }

      const success = await createNormalWill(
        formData.beneficiary,
        formData.assets,
        formData.amount,
        formData.claimWaitTime,
        (hash) => {
          setTransactionHash(hash)
          setWaitingForSignature(false)
        }
      )

      if (success) {
        setFormData({ beneficiary: "", assets: "", amount: "", claimWaitTime: "" })
        setOpenDialog(false)
        setConfirmationChecks(Object.keys(confirmationChecks).reduce((acc, key) => ({ ...acc, [key]: false }), {}))
        // Maybe add a success notification here
      }
    } catch (err) {
      console.error("Error submitting will:", err)
      setError(err.message || "Failed to create will. Please try again.")
    } finally {
      setCreatingWill(false)
      setWaitingForSignature(false)
    }
}


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setValidationError("")
  }

  const handleCheckboxChange = (name) => {
    setConfirmationChecks((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const getConfirmationLabel = (key) => {
    const labels = {
      termsAccepted: "Accept Terms and Conditions",
      understandInactivity: "Understand Inactivity Period",
      understandFees: "Acknowledge Service Fee",
      confirmBeneficiary: "Confirm Beneficiary",
      createBackup: "Create Backup",
      allowDistribution: "Allow Distribution",
      understandLock: "Understand Asset Lock",
      acceptRisks: "Accept Risks",
    }
    return labels[key] || key
  }

  const getConfirmationDescription = (key) => {
    const descriptions = {
      termsAccepted: "I accept the terms and conditions of the Educational Smart Will service",
      understandInactivity: "My academic beneficiary can only claim after 10 years of account inactivity",
      understandFees: "A 2% service fee in BNB tokens will support the Open Campus ecosystem",
      confirmBeneficiary: "The beneficiary address belongs to my chosen academic successor",
      createBackup: "I have securely backed up my wallet credentials and academic documentation",
      allowDistribution: "If unclaimed, I allow distribution to the Open Campus scholarship fund",
      understandLock: "Academic assets will be locked for minimum 1 year after creation",
      acceptRisks: "I understand and accept all risks associated with blockchain-based academic asset transfer",
    }
    return descriptions[key] || ""
  }

  const ConfirmationCheckboxes = () => (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
      {Object.entries(confirmationChecks).map(([key, value], index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-start space-x-3 p-4 rounded-xl bg-black/50 border border-[#F3BA2F]/20 hover:bg-[#F3BA2F]/5 transition-all duration-200 group"
        >
          <Checkbox 
            id={key} 
            checked={value} 
            onCheckedChange={() => handleCheckboxChange(key)} 
            className="mt-1 data-[state=checked]:bg-[#F3BA2F] data-[state=checked]:border-[#F3BA2F] group-hover:border-[#F3BA2F]/50" 
          />
          <div className="space-y-1">
            <Label htmlFor={key} className="text-sm font-medium leading-none cursor-pointer text-white group-hover:text-[#F3BA2F] transition-colors">
              {getConfirmationLabel(key)}
            </Label>
            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{getConfirmationDescription(key)}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )

  if (creatingWill) {
    return (
      <DotBackground>
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-full max-w-md bg-black/50 border border-[#F3BA2F]/20">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin text-[#F3BA2F] stroke-[3px]" />
                  <div className="absolute inset-0 bg-[#F3BA2F]/20 rounded-full blur-xl" />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    {waitingForSignature
                      ? "Please Confirm Transaction"
                      : "Creating Your Will"}
                  </h3>

                  <p className="text-gray-400">
                    {waitingForSignature ? (
                      <>
                        Please accept the MetaMask request and confirm the transaction<br />
                        <span className="font-medium text-[#F3BA2F]">Amount to deposit: {formData.amount} BNB</span>
                      </>
                    ) : (
                      "Waiting for the transaction to be mined..."
                    )}
                  </p>
                </div>

                {transactionHash && (
                  <div className="w-full space-y-2">
                    <p className="text-sm text-gray-400 text-center">Transaction Hash:</p>
                    <a
                      href={`${process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL}/tx/${transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#F3BA2F] hover:text-[#F3BA2F]/80 break-all text-center block"
                    >
                      {transactionHash}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DotBackground>
    )
  }

  if (loading || checkingWill) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#F3BA2F]" />
      </div>
    )
  }

  if (hasWill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md bg-transparent backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary stroke-[3px]" />
              <p className="text-lg font-medium text-center">
                You already have an existing will. Redirecting you to the management page...
              </p>
              <p className="text-sm text-muted-foreground text-center">
                Please wait a moment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Wallet Info Component
  const WalletInfo = () => {
    if (!account) return null

    return (
      <Card className="mb-8 bg-transparent backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Wallet className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Connected Wallet</p>
                <p className="font-medium">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="font-medium">{Number(balance).toFixed(4)} BNB</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const validateForm = () => {
    if (formData.assets.length < 50) {
      setValidationError("Description must be at least 50 characters long")
      return false
    }
    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      setValidationError("Initial deposit amount is required")
      return false
    }
    if (!isAddress(formData.beneficiary)) {
      setValidationError("Invalid beneficiary address")
      return false
    }

    if (!formData.claimWaitTime || Number.parseInt(formData.claimWaitTime) < 60) {
      setValidationError("Claim wait time must be at least 60 seconds")
      return false
    }

    if (!Object.values(confirmationChecks).every(Boolean)) {
      setValidationError("Please confirm all conditions before proceeding")
      return false
    }
    setValidationError("")
    return true
  }

  const goHome = () => {
    router.push("/")
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Button
          variant="ghost"
          onClick={goHome}
          className="text-gray-400 hover:text-white mb-6 group"
        >
          <IconArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Button>
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F3BA2F]/10 text-[#F3BA2F] text-sm mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Secure Your Digital Legacy
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent mb-4">
            Create Your Will
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Secure your digital assets with a smart contract will on BNB Chain
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-black/50 border border-[#F3BA2F]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Shield className="mr-2 text-[#F3BA2F]" />
                Will Details
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the details of your will
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="beneficiary" className="text-white flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#F3BA2F]" />
                        Beneficiary Address
                      </Label>
                      <Input
                        id="beneficiary"
                        name="beneficiary"
                        value={formData.beneficiary}
                        onChange={handleChange}
                        placeholder="0x..."
                        className="bg-black/50 border-[#F3BA2F]/20 text-white placeholder:text-gray-500 focus:border-[#F3BA2F]/50 focus:ring-[#F3BA2F]/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="amount" className="text-white flex items-center gap-2">
                        <Coins className="w-4 h-4 text-[#F3BA2F]" />
                        Amount (BNB)
                      </Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.0"
                        className="bg-black/50 border-[#F3BA2F]/20 text-white placeholder:text-gray-500 focus:border-[#F3BA2F]/50 focus:ring-[#F3BA2F]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="assets" className="text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#F3BA2F]" />
                        Assets Description
                      </Label>
                      <Textarea
                        id="assets"
                        name="assets"
                        value={formData.assets}
                        onChange={handleChange}
                        placeholder="Describe the assets to be transferred..."
                        className="bg-black/50 border-[#F3BA2F]/20 text-white placeholder:text-gray-500 focus:border-[#F3BA2F]/50 focus:ring-[#F3BA2F]/20 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="claimWaitTime" className="text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#F3BA2F]" />
                        Claim Wait Time (days)
                      </Label>
                      <Input
                        id="claimWaitTime"
                        name="claimWaitTime"
                        type="number"
                        value={formData.claimWaitTime}
                        onChange={handleChange}
                        placeholder="365"
                        className="bg-black/50 border-[#F3BA2F]/20 text-white placeholder:text-gray-500 focus:border-[#F3BA2F]/50 focus:ring-[#F3BA2F]/20"
                      />
                    </div>
                  </div>
                </div>

                {validationError && (
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                )}

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      type="submit"
                      className="w-full bg-[#F3BA2F] text-black hover:bg-[#F3BA2F]/90 transition-all duration-200 group h-12 text-lg"
                    >
                      <span className="flex items-center">
                        Create Will
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black/95 border border-[#F3BA2F]/20">
                    <DialogTitle className="text-xl font-bold text-white">Confirm Will Creation</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Please review and confirm the following details before creating your will
                    </DialogDescription>
                    <ConfirmationCheckboxes />
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="w-full bg-[#F3BA2F] text-black hover:bg-[#F3BA2F]/90 transition-all duration-200 group h-12 text-lg"
                        disabled={Object.values(confirmationChecks).some((check) => !check)}
                      >
                        <span className="flex items-center">
                          Confirm & Create Will
                          <Lock className="ml-2 h-5 w-5" />
                        </span>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <Card className="bg-black/50 border border-[#F3BA2F]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Wallet className="mr-2 text-[#F3BA2F]" />
                Wallet Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isConnected ? (
                <Button
                  onClick={connectWallet}
                  className="w-full bg-[#F3BA2F] text-black hover:bg-[#F3BA2F]/90 h-12 text-lg"
                >
                  Connect Wallet
                </Button>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-[#F3BA2F]/5 border border-[#F3BA2F]/20">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400">Connected Account</span>
                      <span className="text-[#F3BA2F] text-sm">BNB Chain</span>
                    </div>
                    <p className="text-white font-mono text-sm break-all">{account}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F3BA2F]/5 border border-[#F3BA2F]/20">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Balance</span>
                      <span className="text-white font-medium">{balance} BNB</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-black/50 border border-[#F3BA2F]/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Info className="mr-2 text-[#F3BA2F]" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-[#F3BA2F]/5 border border-[#F3BA2F]/20">
                  <Clock className="w-6 h-6 text-[#F3BA2F] mt-1" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Time Lock</h4>
                    <p className="text-sm text-gray-400">Assets will be locked for the specified wait time before they can be claimed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-[#F3BA2F]/5 border border-[#F3BA2F]/20">
                  <Shield className="w-6 h-6 text-[#F3BA2F] mt-1" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Security</h4>
                    <p className="text-sm text-gray-400">Your will is secured by smart contracts on BNB Chain</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-[#F3BA2F]/5 border border-[#F3BA2F]/20">
                  <CheckCircle2 className="w-6 h-6 text-[#F3BA2F] mt-1" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Verification</h4>
                    <p className="text-sm text-gray-400">All transactions are verified and immutable on the blockchain</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}