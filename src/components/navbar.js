import React, { Component } from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';
import { Location } from '@reach/router';
import { FormattedMessage } from 'react-intl';

import { throttle } from '../utils/math';
import { media } from '../utils/media';
import MobileMenu from './mobile-menu';
import Link from './link';
import logo from '../images/logo.png';

const HEADER_HEIGHT = 65;

const Logo = styled.div`
  background-image: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 55px;
  height: 55px;
`;

const ContactButton = styled(Link)`
  border: 2px solid #4A4A4A;
  border-radius: 6px;
  padding: 5px 14px;
  color: #4A4A4A;
  transition: all 0.3s;
  text-decoration: none;
  :hover {
    color: #D4AF65;
    border: 2px solid #D4AF65;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  z-index: 999;
  background-color: white;
  overflow: hidden;
  width: 100%;
  height: ${props =>
    (props.scrollDirection === 'none' ? '80px' : `${HEADER_HEIGHT}px`)};
  box-shadow: ${props =>
    (props.scrollDirection !== 'none' ? '0 1px 2px rgba(60, 60, 62, 0.1)' : 'none')};
  /* transform: translateY(
    ${props => (props.scrollDirection === 'down' ? `-${'70px'}` : '0px')}
  ); */
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  ::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  counter-reset: item 0;
  position: relative;
  z-index: 12;
  max-width: 1200px;
  margin: 0px auto;
`;

const Hamburger = styled.div`
  justify-content: center;
  align-items: center;
  overflow: visible;
  margin: 0 -12px 0 0;
  padding: 15px 5px 15px 15px;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: white;
  display: none;
  ${media.desktop`display: flex;`};
`;

const HamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 24px;
`;

const HamburgerInner = styled.div`
  background-color: #D4AF65;
  position: absolute;
  width: 30px;
  height: 2px;
  border-radius: 2px;
  top: 50%;
  left: 0;
  right: 0;
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: ${props => (props.menuOpen ? '0.12s' : '0s')};
  transform: rotate(${props => (props.menuOpen ? '225deg' : '0deg')});
  transition-timing-function: cubic-bezier(
    ${props => (props.menuOpen ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19')}
  );
  &:before,
  &:after {
    content: '';
    display: block;
    background-color: #D4AF65;
    position: absolute;
    left: auto;
    right: 0;
    width: 30px;
    height: 2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
  }
  &:before {
    width: ${props => (props.menuOpen ? '100%' : '120%')};
    top: ${props => (props.menuOpen ? '0' : '-10px')};
    opacity: ${props => (props.menuOpen ? 0 : 1)};
    transition: ${props => (props.menuOpen
    ? 'top 0.1s ease-out, opacity 0.1s ease-out 0.12s'
    : 'top 0.1s ease-in 0.25s, opacity 0.1s ease-in')};
  }
  &:after {
    width: ${props => (props.menuOpen ? '100%' : '80%')};
    bottom: ${props => (props.menuOpen ? '0' : '-10px')};
    transform: rotate(${props => (props.menuOpen ? '-90deg' : '0')});
    transition: ${props => (props.menuOpen
    ? 'bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s'
    : 'bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)')};
  }
  ${media.thone`
    width: 20px;
    &:before {
      top: ${props => (props.menuOpen ? '0' : '-8px')};
    }
    &:after {
      bottom: ${props => (props.menuOpen ? '0' : '-8px')};
    }
  `};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  ${media.desktop`display: none;`};
`;

const NavList = styled.ol`
  padding: 0px;
  margin: 0px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavListItem = styled.li`
  position: relative;
  font-size: 16px;
  margin: 0px 10px;
  padding: 0px 5px;
  counter-increment: item 1;
`;

const NavListItemLink = styled(Link)`
  display: inline-block;
  color: inherit;
  position: relative;
  color: ${props => (props.active ? '#D4AF65' : '#4A4A4A')};
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #D4AF65;
    transform: ${props => (props.active ? 'scaleX(1)' : 'scaleX(0)')};
    transform-origin: left;
    transition: transform 0.4s ease-in-out;
    transition-delay: 0.1s;
  }
  :hover {
    color: #D4AF65;
  }
  :hover::after {
    transform: scaleX(1);
    transition-delay: 0s;
  }
`;

const LogoWrapper = styled(Link)`
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #D4AF65;
  text-decoration: none;
`;

const DELTA = 5;

class Navbar extends Component {
  state = {
    lastScrollTop: 0,
    scrollDirection: 'none',
    menuOpen: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', () => throttle(this.handleScroll()));
    window.addEventListener('resize', () => throttle(this.handleResize()));
    window.addEventListener('keydown', () => this.handleKeydown());
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.handleScroll());
    window.removeEventListener('resize', () => this.handleResize());
    window.removeEventListener('keydown', () => this.handleKeydown());
  }

  handleScroll = () => {
    const { lastScrollTop, menuOpen, scrollDirection } = this.state;
    const fromTop = window.scrollY;

    // Make sure they scroll more than DELTA
    if (Math.abs(lastScrollTop - fromTop) <= DELTA || menuOpen) {
      return;
    }

    if (fromTop < DELTA) {
      this.setState({ scrollDirection: 'none' });
    } else if (fromTop > lastScrollTop && fromTop > HEADER_HEIGHT) {
      if (scrollDirection !== 'down') {
        this.setState({ scrollDirection: 'down' });
      }
    } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
      if (scrollDirection !== 'up') {
        this.setState({ scrollDirection: 'up' });
      }
    }

    this.setState({ lastScrollTop: fromTop });
  }

  handleResize = () => {
    const { menuOpen } = this.state;

    if (window.innerWidth > 768 && menuOpen) {
      this.toggleMenu();
    }
  }

  handleKeydown = evt => {
    const { menuOpen } = this.state;

    if (!menuOpen) {
      return;
    }

    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.toggleMenu();
    }
  }

  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

  handleMenuClick = e => {
    const target = e.target;
    const isLink = target.hasAttribute('href');
    const isContainer = target.classList && target.classList[0].includes('MenuContainer');

    if (isLink || isContainer) {
      this.toggleMenu();
    }
  }

  render() {
    const { scrollDirection, menuOpen } = this.state;

    return (
      <Wrapper scrollDirection={scrollDirection}>
        <Nav>
          <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }}>
            {styles => (
              <LogoWrapper to='/' style={styles}>
                <Logo />
              </LogoWrapper>
            )}
          </Spring>

          <Hamburger onClick={this.toggleMenu}>
            <HamburgerBox>
              <HamburgerInner menuOpen={menuOpen} />
            </HamburgerBox>
          </Hamburger>

          <NavLinks>
            <Location>
              {({ location }) => (
                <NavList>
                  <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={300}>
                    {styles => (
                      <NavListItem style={styles}>
                        <NavListItemLink active={location.pathname === '/'} to='/'>
                          <FormattedMessage id='nav.home' />
                        </NavListItemLink>
                      </NavListItem>
                    )}
                  </Spring>
                  <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={400}>
                    {styles => (
                      <NavListItem style={styles}>
                        <NavListItemLink active={location.pathname.includes('/khach-san')} to='/khach-san'>
                          <FormattedMessage id='nav.hotel' />
                        </NavListItemLink>
                      </NavListItem>
                    )}
                  </Spring>
                  <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={500}>
                    {styles => (
                      <NavListItem style={styles}>
                        <NavListItemLink active={location.pathname.includes('/san-golf')} to='/san-golf'>
                          <FormattedMessage id='nav.golf' />
                        </NavListItemLink>
                      </NavListItem>
                    )}
                  </Spring>
                  <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={600}>
                    {styles => (
                      <NavListItem style={styles}>
                        <NavListItemLink active={location.pathname.includes('/nha-hang')} to='/nha-hang'>
                          <FormattedMessage id='nav.restaurant' />
                        </NavListItemLink>
                      </NavListItem>
                    )}
                  </Spring>
                  <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={700}>
                    {styles => (
                      <NavListItem style={styles}>
                        <NavListItemLink active={location.pathname.includes('/tin-tuc')} to='/tin-tuc'>
                          <FormattedMessage id='nav.news' />
                        </NavListItemLink>
                      </NavListItem>
                    )}
                  </Spring>
                  <Spring from={{ marginBottom: 10, opacity: 0 }} to={{ marginBottom: 0, opacity: 1 }} delay={800}>
                    {styles => (
                      <NavListItem style={{ ...styles, marginRight: 0, paddingRight: 0 }}>
                        <ContactButton active={location.pathname === '/lien-he'} to='/lien-he'>
                          <FormattedMessage id='nav.contact' />
                        </ContactButton>
                      </NavListItem>
                    )}
                  </Spring>
                </NavList>
              )}
            </Location>
          </NavLinks>
        </Nav>
        <MobileMenu
          menuOpen={menuOpen}
          handleMenuClick={e => this.handleMenuClick(e)}
        />
      </Wrapper>
    );
  }
}

export default Navbar;
