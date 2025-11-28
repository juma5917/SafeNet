import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 2rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h4 {
    margin-bottom: 1rem;
    color: #667eea;
  }
  
  p, a {
    margin: 0.5rem 0;
    color: #bbb;
    text-decoration: none;
    
    &:hover {
      color: white;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #444;
  color: #999;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h4>About SafeNet</h4>
          <p>Building digital literacy and preventing online violence through education and community support.</p>
        </FooterSection>
        
        <FooterSection>
          <h4>Quick Links</h4>
          <a href="/resources">Learning Resources</a>
          <a href="/courses">Courses</a>
          <a href="/support">Support Services</a>
        </FooterSection>
        
        <FooterSection>
          <h4>Get Help</h4>
          <a href="/report">Report Incident</a>
          <a href="/support">Find Support</a>
          <a href="/faq">FAQ</a>
        </FooterSection>
        
        <FooterSection>
          <h4>Contact</h4>
          <p>Email: jumasamwel422@gmail.com</p>
          <p>Phone: +354746650468</p>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>&copy; 2025 SafeNet. All rights reserved. | Privacy Policy | Terms of Service</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
