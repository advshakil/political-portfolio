"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type GSAPContextType = {
  gsap: typeof gsap
  isReady: boolean
}

const GSAPContext = createContext<GSAPContextType | null>(null)

export function GSAPProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    setIsReady(true)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <GSAPContext.Provider value={{ gsap, isReady }}>{children}</GSAPContext.Provider>
}

export function useGSAP() {
  const context = useContext(GSAPContext)
  if (!context) {
    throw new Error("useGSAP must be used within a GSAPProvider")
  }
  return context
}
