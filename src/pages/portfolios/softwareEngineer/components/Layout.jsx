import React from 'react';

const Layout = ({ children, user, logout, isAdmin, onOpenNavModal, sections = [] }) => {
  // Default sections if none provided
  const defaultSections = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  const displaySections = sections.length > 0 ? sections : defaultSections;

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <nav className="top-nav">
        <ul className="nav-links">
          <div className="left-nav">
            {displaySections.map((section) => (
              <li key={section.id}>
                <a 
                  href={`#${section.id}`}
                  onClick={(e) => handleNavClick(e, section.id)}
                >
                  {section.label}
                </a>
              </li>
            ))}
            {isAdmin && (
              <li>
                <button 
                  onClick={onOpenNavModal}
                  style={{ 
                    background: 'transparent', 
                    border: '1px solid #00adb5', 
                    color: '#00adb5', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                  title="Manage Navigation"
                >
                  <span style={{ fontSize: '1rem' }}>+</span>
                  <span>Manage</span>
                </button>
              </li>
            )}
          </div>
          {user && user.role !== 'example' && (
            <div className="right-nav">
              <li className="user-greeting">
                <span>Hi, {user.role === 'admin' ? 'Admin' : 'Customer'}</span>
              </li>
              {logout && (
                <li>
                  <button onClick={logout} className="nav-logout-btn">
                    Logout
                  </button>
                </li>
              )}
            </div>
          )}
        </ul>
      </nav>
      <div className="page-container">
        {children}
      </div>
    </>
  );
};

export default Layout; 