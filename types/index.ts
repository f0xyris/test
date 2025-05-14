export interface CustomButtonProps {
    title: string
    containerStyles?: string
    textColor: string
    active: boolean
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