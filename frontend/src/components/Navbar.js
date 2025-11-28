import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaShieldAlt, FaLock, FaHeartbeat, FaUsers, FaGlobe } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const UserMenu = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  button {
    background: white;
    color: #667eea;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  select {
    background: white;
    color: #667eea;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
    
    &:hover {
      transform: translateY(-2px);
    }

    option {
      color: #333;
    }
  }
`;

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <NavbarContainer>
      <NavContent>
        <Logo>
          <FaShieldAlt /> SafeNet
        </Logo>
        <NavLinks>
              <a href="/">Home</a>
              <a href="/resources">Learn</a>
              <a href="/ai">🤖 SafeNet AI</a>
              <a href="/curriculum">Curriculum</a>
              <a href="/support">Support</a>
          {(user?.role === 'admin' || user?.role === 'educator') && (
            <a href="/admin/curriculum" style={{ color: '#ffd700', fontWeight: 'bold' }}>Admin Editor</a>
          )}
        </NavLinks>
        <UserMenu>
          <select value={i18n.language} onChange={handleLanguageChange} title="Select Language">
            <option value="en">🇬🇧 English</option>
            <option value="sw">🇹🇿 Swahili</option>
          </select>
          {isAuthenticated ? (
            <>
              <span>Welcome, {user?.name}</span>
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => window.location.href = '/login'}>Login</button>
              <button onClick={() => window.location.href = '/register'}>Sign Up</button>
            </>
          )}
        </UserMenu>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
