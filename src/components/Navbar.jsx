import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, signout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    signout();
    navigate('/signin');
  };

  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={scrolled ? 'scrolled' : ''} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 5%',
        zIndex: 999
      }}
    >
      <Link 
        to="/" 
        style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          color: '#fff',
          textDecoration: 'none',
          background: 'linear-gradient(135deg, #00d4ff, #9b59b6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        SmartCureX
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link 
          to="/" 
          style={{ 
            color: '#e0e0e0', 
            textDecoration: 'none', 
            transition: 'color 0.3s' 
          }}
        >
          Home
        </Link>
        
        <a 
          href="#features" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('features');
          }} 
          style={{ 
            color: '#e0e0e0', 
            textDecoration: 'none', 
            transition: 'color 0.3s', 
            cursor: 'pointer' 
          }}
        >
          Features
        </a>
        
        <a 
          href="#detection" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('detection');
          }} 
          style={{ 
            color: '#e0e0e0', 
            textDecoration: 'none', 
            transition: 'color 0.3s', 
            cursor: 'pointer' 
          }}
        >
          Detection
        </a>
        
        <a 
          href="#about" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('about');
          }} 
          style={{ 
            color: '#e0e0e0', 
            textDecoration: 'none', 
            transition: 'color 0.3s', 
            cursor: 'pointer' 
          }}
        >
          About
        </a>

        {currentUser ? (
          <button 
            onClick={handleLogout} 
            style={{
              padding: '0.5rem 1.5rem',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
              border: 'none',
              borderRadius: '25px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Logout ({currentUser.name})
          </button>
        ) : (
          <Link 
            to="/signin" 
            style={{
              padding: '0.5rem 1.5rem',
              background: 'linear-gradient(135deg, #00d4ff, #9b59b6)',
              border: 'none',
              borderRadius: '25px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              display: 'inline-block',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
