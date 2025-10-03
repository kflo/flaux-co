import { Link, useLocation } from 'react-router-dom'
import { useUxService } from '@services/ux.service'
import './Navbar.scss'

interface NavbarProps {
  logo?: string
}

export const Navbar: React.FC<NavbarProps> = ({ 
  logo = '/logo/SVG/Logo-Set-4.svg' 
}) => {
  const location = useLocation()
  const { toggleDropdown } = useUxService()

  const isActiveRoute = (path: string) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <div className="text-logo-wrapper">
            <img src={logo} alt="FLAUX Logo" className="logo-navbar" />
            <span className="fl-text">FL</span>
            <span className="a-with-macron">&nbsp;&nbsp;</span>
            <span className="ux-text">AUX</span>
          </div>
        </Link>
      </div>
      <div className="navbar-center">
        <Link 
          to="/solutions" 
          className={isActiveRoute('/solutions')}
        >
          SOLUTIONS
        </Link>
        <Link 
          to="/demo" 
          className={isActiveRoute('/demo')}
        >
          DEMO
        </Link>
        <Link 
          to="/pricing" 
          className={isActiveRoute('/pricing')}
        >
          PRICING
        </Link>
      </div>
      <div className="navbar-right">
        <button className="dropdown-trigger" onClick={toggleDropdown}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}