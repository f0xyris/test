import { MouseEventHandler } from "react"

export interface CustomButtonProps {
    title: string
    containerStyles?: string
    textColor: string
    active: boolean
    handleClick?: MouseEventHandler<HTMLButtonElement>
}

export interface TransitioningState {
  days: boolean;
  hours: boolean;
  minutes: boolean;
  seconds: boolean;
}

export interface TimeDisplayProps {
  targetDate: string
  showSeconds?: boolean
}

export interface ItemProps {
  id: string;
  imgSrc: string;
  title: string;
  description: string;
}