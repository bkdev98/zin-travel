import React, { Component } from 'react';
import { Link } from 'gatsby';
import { slide as Menu } from 'react-burger-menu';
import { FormattedMessage } from 'react-intl';
import { IoIosClose } from 'react-icons/io';

import styled from 'styled-components';
// import { media } from '../utils/media';
import { media } from '../utils/media';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100vh;
  background-color: white;
  padding: 25px;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuBurger = styled.button`
  background: white;
  color: #4A4A4A;
  width: 100%;
  text-align: right;
  svg {
    margin-top: 20px;
    width: 50px;
    height: 50px;
    ${media.thone`
      width: 40px;
      height: 40px;
    `};
  }
`;

const NavItem = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  position: relative;
  margin: 10px 0px;
  transition: all 0.4s ease-in-out;
  color: #4A4A4A;
  padding-bottom: 4px;
  ${media.thone`
    font-size: 18px;
  `};
  :hover {
    color: #D4AF65;
  }
  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #D4AF65;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease-in-out;
    transition-delay: 0.1s;
  }
  :hover::after {
    transform: scaleX(1);
    transition-delay: 0s;
  }
`;

const ContactButton = styled(Link)`
  background: transparent;
  border: 1.5px solid white;
  text-decoration: none;
  border-radius: 8px;
  margin-left: 25px;
  font-size: 16px;
  color: white;
  padding: 5px 20px;
  transition: background 0.4s ease-in-out;
  :hover {
    background: rgba(255,255,255,0.1);
  }
`;

class MobileMenu extends Component {
  render() {
    const { toggleMenu, hideCloseButton, ...props } = this.props;

    return (
      <Menu right {...props}>
        {!hideCloseButton && <MenuBurger onClick={toggleMenu}>
          <IoIosClose />
        </MenuBurger>}
        <MenuContainer>
          <NavItems>
            <NavItem to='/'>
              <FormattedMessage id='nav.home' />
            </NavItem>
            <NavItem to='/khach-san'>
              <FormattedMessage id='nav.hotel' />
            </NavItem>
            <NavItem to='/san-golf'>
              <FormattedMessage id='nav.golf' />
            </NavItem>
            <NavItem to='/nha-hang'>
              <FormattedMessage id='nav.restaurant' />
            </NavItem>
            <NavItem to='/tin-tuc'>
              <FormattedMessage id='nav.news' />
            </NavItem>
            <ContactButton to='/lien-he'>
              <FormattedMessage id='nav.contact' />
            </ContactButton>
          </NavItems>
        </MenuContainer>
      </Menu>
    );
  }
}

export default MobileMenu;
