import { clsx, type ClassValue } from "clsx"
import { twMerge as twMergeOriginal } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMergeOriginal(clsx(inputs))
}