
// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { MdAccountCircle } from "react-icons/md";

// function ProfileIcon() {
//   return <MdAccountCircle size={40} color="#5b3cd9" />;
// }

// export default function Navbar() {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [initials, setInitials] = useState('DOM');

  
//   const navigate = useNavigate();
//   const { portfolioId } = useParams(); // ✅ Get portfolioId from URL
  
//   // ✅ Build base path dynamically
//   const BASE = portfolioId 
//     ? `/portfolios/cleaningService/${portfolioId}`
//     : `/portfolios/cleaningService`;

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     setInitials(user?.name ? user.name.trim().split(' ').map(n => n[0]).join('').toUpperCase() : 'DOM');
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     localStorage.removeItem('isAdmin');
//     localStorage.removeItem('email');
//     localStorage.removeItem('userId');
//     window.dispatchEvent(new Event('auth-change'));
//     setShowDropdown(false);
//     toast.success('Logged out!');
    
//     // ✅ Navigate to main FindVirtual.me or home
//     navigate('/', { replace: true });
//   };

//   return (
//     <div className="navbar">
//       <div className="nav-left">
//         <div className="initials-circle">
//           {initials}
//         </div>
//       </div>

//       <div className="nav-center">
//         {/* ✅ All links now use dynamic BASE */}
//         <NavLink to={`${BASE}/about`}>About</NavLink>
//         <NavLink to={`${BASE}/services`}>Services</NavLink>
//         <NavLink to={`${BASE}/charges`}>Pricing</NavLink>
//       </div>

//       <div className="nav-right">
//         <div
//           className="account-icon"
//           onClick={() => setShowDropdown(!showDropdown)}
//           title="Account"
//         >
//           <MdAccountCircle size={40} color="#5b3cd9" />
//         </div>

//         {showDropdown && (
//           <div className="dropdown-menu">
//             <button className="close-btn" onClick={() => setShowDropdown(false)}>×</button>
//             <button className="logout-btn" onClick={handleLogout}>Log Out</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [initials, setInitials] = useState('DOM');
  const [isVisitorLoggedIn, setIsVisitorLoggedIn] = useState(false);
  const [visitorName, setVisitorName] = useState('');

  const navigate = useNavigate();
  const { portfolioId } = useParams();
  
  const BASE = portfolioId 
    ? `/portfolios/cleaningService/${portfolioId}`
    : `/portfolios/cleaningService`;

  const checkAuthStatus = () => {
    try {
      // Check portfolio owner
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        const userInitials = userData?.name 
          ? userData.name.trim().split(' ').map(n => n[0]).join('').toUpperCase() 
          : 'DOM';
        setInitials(userInitials);
      } else {
        setInitials('DOM');
      }
      
      // Check visitor
      const visitor = localStorage.getItem('visitor');
      if (visitor) {
        const visitorData = JSON.parse(visitor);
        setIsVisitorLoggedIn(true);
        setVisitorName(visitorData.name || '');
      } else {
        setIsVisitorLoggedIn(false);
        setVisitorName('');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setInitials('DOM');
      setIsVisitorLoggedIn(false);
      setVisitorName('');
    }
  };

  useEffect(() => {
    checkAuthStatus();
    
    const handleAuthChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('visitor-auth-change', handleAuthChange);
    
    return () => {
      window.removeEventListener('visitor-auth-change', handleAuthChange);
    };
  }, []);

  const handleVisitorLogout = () => {
    localStorage.removeItem('visitor');
    localStorage.removeItem('visitorToken');
    setIsVisitorLoggedIn(false);
    setVisitorName('');
    setShowDropdown(false);
    window.dispatchEvent(new Event('visitor-auth-change'));
  };

  const handleViewProfile = () => {
    setShowDropdown(false);
    navigate(`${BASE}/visitor-profile`);
  };

  const handleSignIn = () => {
    setShowDropdown(false);
    navigate(`${BASE}/visitor-login`);
  };

  const handleSignUp = () => {
    setShowDropdown(false);
    navigate(`${BASE}/visitor-signup`);
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="initials-circle">
          {initials}
        </div>
      </div>

      <div className="nav-center">
        <NavLink to={`${BASE}/about`}>About</NavLink>
        <NavLink to={`${BASE}/services`}>Services</NavLink>
        <NavLink to={`${BASE}/charges`}>Pricing</NavLink>
      </div>

      <div className="nav-right">
        <div
          className="account-icon"
          onClick={() => setShowDropdown(!showDropdown)}
          title="Account"
        >
          <MdAccountCircle size={40} color="#5b3cd9" />
        </div>

        {showDropdown && (
          <div className="dropdown-menu">
            <button className="close-btn" onClick={() => setShowDropdown(false)}>×</button>
            
            {isVisitorLoggedIn ? (
              <>
                <div className="dropdown-user-info">
                  <p className="welcome-text">Welcome, {visitorName}!</p>
                </div>
                <button className="dropdown-item" onClick={handleViewProfile}>
                  👤 View Profile
                </button>
                <button className="dropdown-item logout-btn" onClick={handleVisitorLogout}>
                  🚪 Log Out
                </button>
              </>
            ) : (
              <>
                <button className="dropdown-item" onClick={handleSignIn}>
                  🔐 Sign In
                </button>
                <button className="dropdown-item" onClick={handleSignUp}>
                  ✍️ Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}