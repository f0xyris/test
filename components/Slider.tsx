"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Swiper as SwiperType } from "swiper";
import { slidesData } from "@/data/slides";
import { motion } from "framer-motion";


const Slider = () => {
  const tabs = ["Experience", "Course", "Pros Play", "Natural"];
  const [isActive, setIsActive] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

    const handleClick = (index: number) => {
        setIsActive(index);
        swiperRef.current?.slideTo(index, 500);
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        }
    }

    return (
        <div className="gradient-violet-peach text-white">
            <section className="container px-4 lg:px-8 pb-16 lg:pb-28 relative pt-16 lg:pt-28 mx-auto">
                <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-full">
                    <motion.div 
                        className="mx-auto w-fit"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }} 
                    >
                        <div className="w-fit rounded-full px-6 pb-1.5 pt-1 font-damion text-[16px] lg:text-[28px] bg-white/10">
                            <span className="flex items-center gap-2.5 text-[#EDA651]">
                                <span>Golf Experience</span>
                            </span>
                        </div>
                    </motion.div>
                    <motion.h2 
                        className="text-4xl lg:text-6xl mt-4 text-center lg:mt-6 font-semibold"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }} 
                    >
                        Why you’ll love playing at&nbsp;Osprey&nbsp;Valley
                    </motion.h2>

                    <motion.div 
                        className="mt-8 lg:mt-16"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }} 
                    >
                        <div className="relative max-h-[556px] w-full overflow-hidden rounded-3xl bg-white px-6 py-8 text-black lg:mx-auto lg:h-[464px] lg:max-w-7xl lg:py-10 lg:pl-24 lg:pr-10 xl:h-[424px]">
                            <div className="absolute inset-y-0 left-6 hidden h-full flex-col justify-center gap-1.5 lg:flex z-10">
                                {tabs.map((tab, index) => (
                                    <motion.div
                                        whileHover={isActive !== index ? { scale: 2 } : {}}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        key={tab}
                                        onClick={() => handleClick(index)}
                                        className="relative grid cursor-pointer place-content-center px-4 py-2"
                                    >
                                        <motion.span
                                            whileHover={{ scale: 1.5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="size-2 rounded-full bg-black scale-[0.5]"
                                        />

                                        {isActive === index && (
                                            <motion.div 
                                                initial={{scale: 0, rotate: 0 }}
                                                animate={{ scale: 1, rotate: 360 }}
                                                exit={{ opacity: 0, y: 20, rotate: 90 }}
                                                transition={{ duration: 0.4 }}
                                                className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2"> 
                                                <Image
                                                    src="/ball-tiny.webp"
                                                    alt="ball"
                                                    width={80}
                                                    height={80}
                                                    className="object-contain"
                                                />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>


                            <Swiper
                                spaceBetween={50}
                                slidesPerView={1}
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                onSlideChange={(swiper) => setIsActive(swiper.activeIndex)}
                                navigation
                                pagination={{ clickable: true }}
                                allowTouchMove={true}
                                loop={true}
                                speed={500}
                                className="relative hidden size-full select-none gap-12 lg:grid lg:grid-cols-[1fr,360px] xl:grid-cols-[1fr,495px]"
                            >
                                <div className="absolute bottom-0 left-0 z-10 gap-3 pb-6 lg:flex hidden">
                                    {tabs.map((item, index) => (
                                        <CustomButton
                                        key={item}
                                        handleClick={() => handleClick(index)}
                                        active={isActive === index}
                                        textColor="text-[#838383]"
                                        title={item}
                                        containerStyles="rounded-lg text-xs hover:bg-[#ebecfb] hover:text-black cursor-pointer px-3 py-2"
                                        />
                                    ))}
                                </div>

                                {slidesData.map((slide, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="flex flex-col lg:flex-row gap-8 h-full pb-14">
                                            <div className="flex-1">
                                                <h3 className="lg:text-[30px] text-2xl lg:pt-10">
                                                    {slide.title}
                                                </h3>
                                                <p className="mt-10 lg:max-w-[40ch] lg:text-[18px] text-sm font-extralight">
                                                    {slide.description}
                                                </p>
                                            </div>
                                            <motion.div 
                                                className="w-full h-full max-w-[550px] lg:max-w-[370px]"
                                                initial={{scale: 1}}
                                                animate={{scale: isActive === index ? 1 : 0.9}}
                                                transition={{duration: 0.3}}
                                            >
                                                <Image
                                                    src={slide.image}
                                                    alt={slide.alt}
                                                    width={743}
                                                    height={516}
                                                    className="w-full lg:h-full h-[224px] lg:rounded-xl rounded-lg object-cover object-right-bottom"
                                                />
                                            </motion.div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                                <div className="absolute inset-x-0 bottom-3 flex w-full justify-center gap-0 lg:hidden">
                                {tabs.map((tab, index) => (
                                    <motion.div
                                        whileHover={isActive !== index ? { scale: 2 } : {}}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        key={tab}
                                        onClick={() => handleClick(index)}
                                        className="relative grid cursor-pointer place-content-center px-2 py-1"
                                    >
                                        <motion.span
                                            whileHover={{ scale: 1.5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="size-2 rounded-full bg-black scale-[0.5]"
                                        />

                                        {isActive === index && (
                                            <motion.div 
                                                initial={{scale: 0, rotate: 0 }}
                                                animate={{ scale: 1, rotate: 360 }}
                                                exit={{ opacity: 0, y: 20, rotate: 90 }}
                                                transition={{ duration: 0.4 }}
                                                className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2"> 
                                                <Image
                                                    src="/ball-tiny.webp"
                                                    alt="ball"
                                                    width={26}
                                                    height={26}
                                                    className="object-contain"
                                                />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                            </Swiper>
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
};

export default Slider;
