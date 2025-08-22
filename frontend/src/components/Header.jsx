import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background-color: #33302e;
  color: white;
  border-bottom: 4px solid #ff8833;
  padding: 0;
`

const TopBar = styled.div`
  background-color: #ff8833;
  padding: 8px 0;
  text-align: center;
  font-family: 'MetricWeb', Arial, sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  span {
    color: white;
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1220px;
  margin: 0 auto;
  padding: 16px 20px;
`

const Logo = styled(Link)`
  font-family: 'FinancierDisplayWeb', Georgia, serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ff8833;
  text-decoration: none;
  letter-spacing: -1px;
  
  &:hover {
    color: #ff8833;
    border-bottom: none;
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 0;
  
  @media (max-width: 768px) {
    gap: 0;
  }
`

const NavLink = styled(Link)`
  color: ${props => props.$active ? '#ff8833' : '#d6d2c4'};
  text-decoration: none;
  padding: 12px 20px;
  font-family: 'MetricWeb', Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid ${props => props.$active ? '#ff8833' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    color: #ff8833;
    border-bottom-color: #ff8833;
  }
`

const Header = () => {
  const location = useLocation()
  
  return (
    <HeaderContainer>
      <TopBar>
        <span>AI & Data Science Solutions</span>
      </TopBar>
      <Nav>
        <Logo to="/">gitthub</Logo>
        <NavLinks>
          <NavLink to="/" $active={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/about" $active={location.pathname === '/about'}>
            About
          </NavLink>
          <NavLink to="/services" $active={location.pathname === '/services'}>
            Services
          </NavLink>
          <NavLink to="/contact" $active={location.pathname === '/contact'}>
            Contact
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  )
}

export default Header