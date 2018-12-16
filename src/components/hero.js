import React, { Component } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql, navigate } from 'gatsby';
import Img from 'gatsby-image';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import { FiMail, FiPhone } from 'react-icons/fi';
import { IoIosMenu } from 'react-icons/io';
import { FormattedMessage, injectIntl } from 'react-intl';

import logo from '../images/logo-white.png';
import Link from './link';
import { media } from '../utils/media';

const Wrapper = styled.div`
  height: 70vh;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  text-align: center;
  ${media.desktop`
    padding: 0px 15px;
    height: 65vh;
  `};
`;

const MenuBurger = styled.button`
  background: transparent;
  color: white;
  display: none;
  ${media.tablet`
    display: block;
  `};
  svg {
    width: 50px;
    height: 50px;
    ${media.thone`
      width: 40px;
      height: 40px;
    `};
  }
`;

const StyledImg = styled(Img)`
  position: absolute !important;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Logo = styled.img`
  width: 95px;
  height: auto;
  ${media.tablet`
    width: 75px;
  `};
  ${media.phablet`
    width: 65px;
  `};
`;

const SubTitle = styled.h3`
  font-weight: 300;
  letter-spacing: 0.4px;
  font-size: 30px;
  margin-bottom: 20px;
  ${media.tablet`
    font-size: 24px;
    margin-bottom: 15px;
  `};
`;

const Title = styled.h1`
  font-weight: 600;
  letter-spacing: 0.4px;
  font-size: 44px;
  margin-bottom: 20px;
  ${media.tablet`
    font-size: 34px;
    margin-bottom: 15px;
  `};
`;

const SearchForm = styled.form`
  display: flex;
`;

const SearchOption = styled(Select)`
  border: 0px;
  border-radius: 5px 0px 0px 5px;
  -webkit-appearance: none;
  height: 50px;
  outline: none;
  background: white;
  display: flex;
  padding-left: 10px;
  width: 170px;
  ::before, ::after {
    display: none;
  }
  input {
    :hover, :focus {
      background: transparent;
    }
  }
  && {
    font-family: 'Open Sans', sans-serif;
    ${media.desktop`
      width: 130px;
    `};
    ${media.thone`
      width: 110px;
      font-size: 16px;
      padding-left: 5px;
    `};
    ${media.phablet`
      width: 90px;
      font-size: 14px;
    `};
    ${media.phone`
      width: 70px;
    `};
  }
`;

const SearchInput = styled.input`
  margin-left: 5px;
  min-width: 360px;
  padding-left: 20px;
  font-size: 18px;
  ${media.desktop`
    min-width: 300px;
  `};
  ${media.thone`
    font-size: 16px;
    min-width: 260px;
    padding-left: 15px;
  `};
  ${media.phablet`
    font-size: 14px;
    min-width: 210px;
    padding-left: 10px;
  `};
  ${media.phone`
    min-width: 180px;
    margin-left: 0px;
  `};
`;

const SearchButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s linear;
  && {
    ${media.thone`
      min-width: 40px !important;
    `};
    ${media.phablet`
      min-width: 35px !important;
    `};
    ${media.phone`
      min-width: 30px !important;
    `};
    background: #D4AF65;
    color: white;
    border-radius: 0px 5px 5px 0px;
    &:hover {
      background: #ba9853;
    }
  }
`;

const HeroNavigation = styled.div`
  position: absolute;
  width: 100%;
  top: 25px;
  ${media.desktop`
    padding: 0px 20px;
  `};
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  ${media.tablet`
    display: none;
  `};
`;

const TopContact = styled.div`
  display: flex;
`;

const NavItems = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`;

const NavContact = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 5px;
    width: 18px;
    height: 18px;
  }
  color: white;
  font-size: 16px;
  margin-left: 25px;
  text-decoration: none;
`;

const NavItem = styled(Link)`
  color: white;
  font-size: 16px;
  margin-left: 25px;
  text-decoration: none;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: white;
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

class Hero extends Component {
  state = { searchText: '', searchType: 'hotel' }

  handleChangeType = event => {
    this.setState({ searchType: event.target.value });
  }

  handleSearch = e => {
    e.preventDefault();
    const { searchText, searchType } = this.state;
    navigate('/tim-kiem', { state: { searchText, searchType } });
  }

  render() {
    const { searchText, searchType } = this.state;
    const { intl, toggleMenu } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query HeroQuery {
            placeholderImage: file(relativePath: { eq: "hero-image.png" }) {
              childImageSharp {
                fluid(maxWidth: 3000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            contact: allPagesYaml(filter: { companyName: { ne: null } }) {
              edges {
                node {
                  phone
                  email
                }
              }
            }
          }
        `}
        render={({ contact, placeholderImage }) => (
          <Wrapper>
            <HeroNavigation>
              <NavInner>
                <Link to='/'>
                  <Logo src={logo} />
                </Link>
                <MenuBurger onClick={toggleMenu}>
                  <IoIosMenu />
                </MenuBurger>
                <NavContainer>
                  <TopContact>
                    <NavContact href="#"><FiMail /> {contact.edges[0].node.email}</NavContact>
                    <NavContact href="#"><FiPhone /> {contact.edges[0].node.phone}</NavContact>
                    {/* <NavItem>Tiếng Việt</NavItem> */}
                  </TopContact>
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
                </NavContainer>
              </NavInner>
            </HeroNavigation>
            <SubTitle>
              <FormattedMessage id='hero.title1' />
            </SubTitle>
            <Title>
              <FormattedMessage id='hero.title2' />
            </Title>
            <SearchForm onSubmit={this.handleSearch}>
              <SearchOption value={searchType} onChange={this.handleChangeType}>
                <MenuItem value='hotel'>
                  <FormattedMessage id='search.hotel' />
                </MenuItem>
                <MenuItem value='golf'>
                  <FormattedMessage id='search.golf' />
                </MenuItem>
                <MenuItem value='restaurant'>
                  <FormattedMessage id='search.restaurant' />
                </MenuItem>
              </SearchOption>
              <SearchInput
                value={searchText}
                onChange={e => this.setState({ searchText: e.target.value })}
                autoFocus
                placeholder={intl.formatMessage({ id: 'search.placeholder' })}
              />
              <SearchButton onClick={this.handleSearch}>
                <SearchIcon />
              </SearchButton>
            </SearchForm>
            <StyledImg fluid={placeholderImage.childImageSharp.fluid} />
          </Wrapper>
        )}
      />
    );
  }
}

export default injectIntl(Hero);
