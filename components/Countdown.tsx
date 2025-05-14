"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CustomButton from "./CustomButton"

type CountdownFullProps = {
  showSeconds?: boolean
}

const targetDateStr = "2025-09-22"
const targetDate = new Date(targetDateStr)

const getFormattedDate = (date: Date): string => {
  const day = date.getDate()
  const month = date.toLocaleString("en-US", { month: "long" })
  const year = date.getFullYear()

  const getDaySuffix = (d: number): string => {
    if (d >= 11 && d <= 13) return "th"
    switch (d % 10) {
      case 1: return "st"
      case 2: return "nd"
      case 3: return "rd"
      default: return "th"
    }
  }

  return `${month} ${day}${getDaySuffix(day)}, ${year}`
}

const calculateTimeLeft = (target: string) => {
  const targetTime = new Date(target).getTime()
  const currentTime = new Date().getTime()
  const difference = targetTime - currentTime

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

const CountdownFull: React.FC<CountdownFullProps> = ({ showSeconds = true }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDateStr))
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDateStr))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formattedDate = getFormattedDate(targetDate)

  const timeParts = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ].filter(part => showSeconds || part.label !== "Seconds")

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    }
  }

  return (
    <div className="gradient-violet-peach flex w-full flex-col items-center gap-8 rounded-3xl px-6 py-10 text-white lg:flex-row lg:justify-between lg:rounded-xl lg:px-12 lg:py-11 z-20 rounded-t-none justify-between absolute bottom-0 lg:relative lg:bottom-auto">
      {hasHydrated && (
        <>
          <motion.div className="w-full">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center text-md lg:text-left lg:text-lg"
            >
              {formattedDate}
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-1.5 text-[32px] font-semibold lg:mt-1 lg:text-[36px] text-center text-md lg:text-left lg:text-lg"
            >
              Only {timeLeft.days} days left
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-5 hidden lg:block"
            >
              <a target="_blank" href="https://premiercharityopen.com/index">
                <CustomButton
                  active={false}
                  textColor="text-white"
                  title="Buy Tickets"
                  containerStyles="relative flex items-center justify-center text-nowrap border text-center transition-colors
                    hover:border-indigo-500/100 hover:bg-indigo-500/100 disabled:cursor-not-allowed
                    border-white h-11 rounded-[14px] px-6 py-3.5 text-md cursor-pointer"
                />
              </a>
            </motion.div>
          </motion.div>

          <div className="flex flex-row gap-4 w-full lg:w-auto">
            {timeParts.map((part, index) => (
              <motion.div
                key={part.label}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative flex flex-col items-center justify-center min-h-28 w-full rounded-xl bg-white/10 text-center lg:aspect-square lg:size-28 lg:min-w-28 overflow-hidden"
              >
                <div className="mt-2 text-xl">{part.label}</div>

                <div className="relative h-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={part.value}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white"
                    >
                      <strong>{part.value}</strong>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="w-full lg:hidden"
            >
              <a target="_blank" href="https://premiercharityopen.com/index">
                <CustomButton
                  active={false}
                  textColor="text-white"
                  title="Buy Tickets"
                  containerStyles="relative flex items-center justify-center text-nowrap border text-center transition-colors
                    hover:border-indigo-500/100 hover:bg-indigo-500/100 disabled:cursor-not-allowed
                    border-white h-11 rounded-[14px] px-6 py-3.5 text-md cursor-pointer w-full"
                />
              </a>
            </motion.div>
        </>
      )}
    </div>
  )
}

export default CountdownFull
