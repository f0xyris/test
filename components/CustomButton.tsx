"use client"

import { CustomButtonProps } from "@/types"

const CustomButton = ({title, containerStyles, textColor, active, handleClick}: CustomButtonProps) => {
  return (
    <button 
      className={`custom-btn ${containerStyles} ${active ? 'bg-[#ebecfb] text-black' : ''}`} 
      disabled={false} 
      type={"button"}
      onClick={handleClick} 
    >
        <span className={`transition-colors ${textColor}`}>{title}</span>
    </button>
  )
}

export default CustomButton