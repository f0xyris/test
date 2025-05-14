"use client"

import Image from "next/image"
import Countdown from "./Countdown"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"


const Hero: React.FC = () => {

    const sectionRef = useRef<HTMLElement>(null)

    const { scrollY } = useScroll()
    
    const rawScale = useTransform(scrollY, [0, 1000], [0.5, 1.5])
    const rawX = useTransform(scrollY, [0, 1000], [0, -600])
    const rawY = useTransform(scrollY, [0, 400, 1000], [0, -350, -1200])
    const rawRotate = useTransform(scrollY, [0, 1000], [0, 360])

    const scale = useSpring(rawScale, { stiffness: 80, damping: 40 })
    const translateX = useSpring(rawX, { stiffness: 80, damping: 40 })
    const translateY = useSpring(rawY, { stiffness: 80, damping: 40 })
    const rotate = useSpring(rawRotate, { stiffness: 80, damping: 40 })

    const transform = useTransform(
        [translateX, translateY, scale, rotate],
        ([x, y, scale, rotate]) => `translateX(${x}px) translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`
    )

    const variants = {
        initial: { opacity: 0, translateY: 20 },
        lifted: { opacity: 1, translateY: 0 },
    };

    return (
        
            <motion.section 
                variants={variants}
                initial="initial"
                animate="lifted"
                transition={{ duration: 1 }} ref={sectionRef} 
                className="container px-4 lg:px-8 pb-16 lg:pb-28 mx-auto"
            >
                <div className="relative flex flex-col items-center gap-8 py-16 lg:gap-10 lg:py-20 text-black">
                    <div className="flex items-center flex-col">
                        <h2 className="font-damion text-[3.5rem] text-[#eda651] -rotate-5 -mb-2 mr-3">CharityOpen</h2>
                        <span className="text-transform: uppercase tracking-widest text-lg">Premier 2025</span>
                    </div>
                    <div>
                        <h1 className="text-center text-[48px] leading-[110%] lg:text-[76px] font-medium">Let’s Drive Change!</h1>
                    </div>
                </div>
                <div className="relative mx-auto mt-16 w-full duration-300 lg:mt-20 lg:grid place-items-end lg:p-6 min-h-[700px] lg:min-h-[850px] max-w-xl lg:max-w-full">
                    <motion.div 
                        style={{transform}}
                        className="absolute left-1/6 top-1/2 z-10 lg:size-[420px] will-change-transform" >
                        <Image src="/ball.webp" alt="Spinning charity ball" width={500} height={500}/>
                    </motion.div>
                    <Image src="/men.webp" alt="golf men" width={1824} height={1081} className="rounded-2xl size-full lg:h-full w-full h-120 rounded-t-3xl object-cover object-[60%_0%] lg:absolute lg:inset-0 lg:max-h-full lg:rounded-3xl"/>
                    <Countdown />
                </div>
            </motion.section>
    )
}

export default Hero