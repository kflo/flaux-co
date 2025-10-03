import { Link } from 'react-router-dom'
import './Footer.scss'

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
        <img src="/logo/SVG/Logo-Set-4.svg" alt="flaux-co logo" className="footer-logo" />
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <p>&copy; 2025 FLAUX &mdash; All rights reserved.</p>
    </footer>
  )
}