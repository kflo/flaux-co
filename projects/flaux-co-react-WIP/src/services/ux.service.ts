import { useState, useCallback, useEffect } from 'react'

// UX Service State
let dropdownOpen = false
let listeners: Array<(isOpen: boolean) => void> = []

// Service Functions
const toggleDropdown = () => {
  dropdownOpen = !dropdownOpen
  listeners.forEach(listener => listener(dropdownOpen))
}

const openDropdown = () => {
  dropdownOpen = true
  listeners.forEach(listener => listener(dropdownOpen))
}

const closeDropdown = () => {
  dropdownOpen = false
  listeners.forEach(listener => listener(dropdownOpen))
}

const subscribe = (listener: (isOpen: boolean) => void) => {
  listeners.push(listener)
  // Return unsubscribe function
  return () => {
    listeners = listeners.filter(l => l !== listener)
  }
}

// Hook to use the UX service in components
export const useUxService = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(dropdownOpen)

  const handleToggle = useCallback(() => {
    toggleDropdown()
  }, [])

  const handleOpen = useCallback(() => {
    openDropdown()
  }, [])

  const handleClose = useCallback(() => {
    closeDropdown()
  }, [])

  // Subscribe to changes
  useEffect(() => {
    const unsubscribe = subscribe(setIsDropdownOpen)
    return unsubscribe
  }, [])

  return {
    isDropdownOpen,
    toggleDropdown: handleToggle,
    openDropdown: handleOpen,
    closeDropdown: handleClose
  }
}