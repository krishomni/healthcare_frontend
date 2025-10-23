import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTooth, FaBars, FaTimes, FaSearch } from 'react-icons/fa';

export default function Navbar({ userData, practiceId }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: `/portfolios/healthcare/${practiceId}`, label: 'Home' },
    { href: `/portfolios/healthcare/${practiceId}/services`, label: 'Services' },
    { href: `/portfolios/healthcare/${practiceId}/blog`, label: 'Blog' },
    { href: `/portfolios/healthcare/${practiceId}/gallery`, label: 'Gallery' },
    { href: `/portfolios/healthcare/${practiceId}/contact`, label: 'Contact' }
  ];

  return (
    <header className={`healthcare-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-content">
        <Link to={`/portfolios/healthcare/${practiceId}`} className="logo">
          <div className="logo-icon">
            <FaTooth />
          </div>
          <span>{userData?.practice?.name || 'Healthcare Practice'}</span>
        </Link>
        
        <div className="nav-links desktop">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <Link
          to={`/portfolios/healthcare/${practiceId}/contact`}
          className="btn-contact desktop"
        >
          Contact Us
        </Link>
        
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`mobile-link ${location.pathname === item.href ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}