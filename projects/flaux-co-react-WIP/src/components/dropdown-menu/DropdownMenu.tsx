import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUxService } from '@services/ux.service'
import './DropdownMenu.scss'

export const DropdownMenu: React.FC = () => {
  const location = useLocation()
  const { isDropdownOpen, closeDropdown } = useUxService()

  const isActiveRoute = (path: string) => {
    return location.pathname === path ? 'active' : ''
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-menu') && !target.closest('.dropdown-trigger')) {
        closeDropdown()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [closeDropdown])

  return (
    <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
      <Link 
        to="/blog" 
        className={isActiveRoute('/blog')}
      >
        Blog / Insights
      </Link>
      <Link 
        to="/about" 
        className={isActiveRoute('/about')}
      >
        About
      </Link>
      <Link 
        to="/contact" 
        className={isActiveRoute('/contact')}
      >
        Contact
      </Link>
      <Link 
        to="/login" 
        className={isActiveRoute('/login')}
      >
        Login
      </Link>
      <Link 
        to="/signup" 
        className={isActiveRoute('/signup')}
      >
        Signup
      </Link>
      <Link 
        to="/reset-password" 
        className={isActiveRoute('/reset-password')}
      >
        Reset Password
      </Link>
      <Link 
        to="/checkout" 
        className={isActiveRoute('/checkout')}
      >
        Checkout
      </Link>
      <Link 
        to="/dashboard" 
        className={isActiveRoute('/dashboard')}
      >
        Dashboard
      </Link>
    </div>
  )
}