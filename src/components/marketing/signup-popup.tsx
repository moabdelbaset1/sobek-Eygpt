"use client"

import { useState, useEffect } from "react"
import { X, Gift, Percent, ShoppingBag } from "lucide-react"

interface SignupPopupProps {
  onClose: () => void
  onSignup: () => void
}

export default function SignupPopup({ onClose, onSignup }: SignupPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const handleSignup = () => {
    setIsVisible(false)
    setTimeout(onSignup, 300)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Header with Gradient */}
        <div className="bg-gradient-to-br from-red-600 to-black p-8 rounded-t-2xl text-white text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Gift className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Special Offer Just For You!</h2>
          <p className="text-red-100">Don't miss out on this exclusive deal</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-4 mb-6">
            {/* Discount Badge */}
            <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-300 rounded-xl">
              <Percent className="h-8 w-8 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-red-900 text-lg">Get 15% OFF</p>
                <p className="text-sm text-red-700">On your first order</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">Exclusive access to member-only deals</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">Free shipping on orders over $50</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">Early access to new products</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-red-600 to-black text-white font-semibold py-3 px-6 rounded-xl hover:from-red-700 hover:to-gray-900 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Claim My 15% Discount
            </button>
            <button
              onClick={handleClose}
              className="w-full text-gray-600 font-medium py-2 hover:text-gray-800 transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Urgency Timer */}
          <p className="text-center text-xs text-gray-500 mt-4">
            ⏰ Offer valid for new members only • Limited time
          </p>
        </div>
      </div>
    </div>
  )
}
