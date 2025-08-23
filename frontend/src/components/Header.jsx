import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background-color: var(--gitthub-beige);
  border-bottom: 2px solid var(--gitthub-black);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  ${props => props.$scrolled && `
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  `}
`

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  @media (max-width: 768px) {
    height: 70px;
    padding: 0 var(--spacing-md);
  }
`

const Logo = styled(Link)`
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--gitthub-black);
  letter-spacing: -0.05em;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--gitthub-beige);
    flex-direction: column;
    padding: var(--spacing-lg);
    border-bottom: 2px solid var(--gitthub-black);
    transform: translateY(${props => props.$open ? '0' : '-100%'});
    opacity: ${props => props.$open ? '1' : '0'};
    pointer-events: ${props => props.$open ? 'all' : 'none'};
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`

const NavLink = styled(Link)`
  color: var(--gitthub-black);
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  padding: var(--spacing-xs) 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--gitthub-black);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  ${props => props.$active && `
    &::after {
      width: 100%;
      background: #FF0000;
    }
  `}

  @media (max-width: 768px) {
    font-size: 1.25rem;
    padding: var(--spacing-sm) 0;
  }
`

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    display: block;
    width: 100%;
    height: 3px;
    background: var(--gitthub-black);
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) {
      transform: ${props => props.$open ? 'translateY(10.5px) rotate(45deg)' : 'none'};
    }

    &:nth-child(2) {
      opacity: ${props => props.$open ? '0' : '1'};
    }

    &:nth-child(3) {
      transform: ${props => props.$open ? 'translateY(-10.5px) rotate(-45deg)' : 'none'};
    }
  }
`

function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/databank', label: 'Data Bank' },
    { path: '/data-explorer', label: 'Explorer' },
    { path: '/course-generator', label: 'AI Courses' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <HeaderContainer $scrolled={scrolled}>
      <Nav>
        <Logo to="/">gitthub</Logo>
        <NavLinks $open={menuOpen}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              $active={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
        <MenuButton
          $open={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </MenuButton>
      </Nav>
    </HeaderContainer>
  )
}

export default Header