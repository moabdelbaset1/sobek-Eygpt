"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SignupPopup from "@/components/marketing/signup-popup"

const POPUP_DELAY = 60000 // 1 minute in milliseconds
const STORAGE_KEY = "signup_popup_shown"
const STORAGE_TIMESTAMP = "signup_popup_timestamp"
const POPUP_COOLDOWN = 24 * 60 * 60 * 1000 // 24 hours

export default function MarketingPopupProvider({ children }: { children: React.ReactNode }) {
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkUserStatus = async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            // User is logged in, don't show popup
            return
          }
        }
      } catch (error) {
        console.log("Session check failed, proceeding with popup logic")
      }

      // Check if popup was shown recently
      const lastShown = localStorage.getItem(STORAGE_TIMESTAMP)
      if (lastShown) {
        const timeSinceLastShown = Date.now() - parseInt(lastShown)
        if (timeSinceLastShown < POPUP_COOLDOWN) {
          // Don't show popup if it was shown in the last 24 hours
          return
        }
      }

      // Set timer to show popup after delay
      const timer = setTimeout(() => {
        setShowPopup(true)
        // Mark popup as shown
        localStorage.setItem(STORAGE_KEY, "true")
        localStorage.setItem(STORAGE_TIMESTAMP, Date.now().toString())
      }, POPUP_DELAY)

      return () => clearTimeout(timer)
    }

    checkUserStatus()
  }, [])

  const handleClose = () => {
    setShowPopup(false)
  }

  const handleSignup = () => {
    setShowPopup(false)
    // Redirect to signup page with discount code
    router.push("/signup?discount=WELCOME15")
  }

  return (
    <>
      {children}
      {showPopup && <SignupPopup onClose={handleClose} onSignup={handleSignup} />}
    </>
  )
}
