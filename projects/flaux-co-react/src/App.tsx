import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from '@components/navbar/Navbar'
import { DropdownMenu } from '@components/dropdown-menu/DropdownMenu'
import { Home } from '@pages/home/Home'
import { Solutions } from '@pages/solutions/Solutions'
import { Demo } from '@pages/demo/Demo'
import { Pricing } from '@pages/pricing/Pricing'
import { Blog } from '@pages/blog/Blog'
import { About } from '@pages/about/About'
import { Contact } from '@pages/contact/Contact'
import { Login } from '@pages/login/Login'
import { Signup } from '@pages/signup/Signup'
import { ResetPassword } from '@pages/reset-password/ResetPassword'
import { Checkout } from '@pages/checkout/Checkout'
import { Dashboard } from '@pages/dashboard/Dashboard'
import './App.scss'

function App() {
  const logo = '/logo/SVG/Logo-Set-4.svg'

  return (
    <Router>
      <div className="app">
        <Navbar logo={logo} />
        <DropdownMenu />
        <div className="router-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
