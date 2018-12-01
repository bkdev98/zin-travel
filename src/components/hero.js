import React, { Component } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';

import logo from '../images/logo-white.png';

const Wrapper = styled.div`
  height: 80vh;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  text-align: center;
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
`;

const SubTitle = styled.h3`
  font-weight: 300;
  letter-spacing: 0.4px;
  font-size: 30px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-weight: 600;
  letter-spacing: 0.4px;
  font-size: 44px;
  margin-bottom: 20px;
`;

const SearchForm = styled.div`
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
  }
`;

const SearchInput = styled.input`
  margin-left: 5px;
  min-width: 370px;
  padding-left: 20px;
`;

const SearchButton = styled(Button)`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s linear;
  && {
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
`;

const TopContact = styled.div`
  display: flex;
`;

const NavItems = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
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

const BGImage = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "hero-image.png" }) {
          childImageSharp {
            fluid(maxWidth: 3000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <StyledImg fluid={data.placeholderImage.childImageSharp.fluid} />}
  />
);

class Hero extends Component {
  state = { searchType: 'hotel' }

  handleChangeType = event => {
    this.setState({ searchType: event.target.value });
  }

  render() {
    const { title, subTitle } = this.props;
    const { searchType } = this.state;
    return (
      <Wrapper>
        <HeroNavigation>
          <NavInner>
            <Logo src={logo} />
            <NavContainer>
              <TopContact>
                <NavItem>lienhe@zintravel.vn</NavItem>
                <NavItem>0917 679 524</NavItem>
                <NavItem>Tiếng Việt</NavItem>
              </TopContact>
              <NavItems>
                <NavItem to='/'>Trang Chủ</NavItem>
                <NavItem to='/khach-san'>Khách Sạn</NavItem>
                <NavItem to='/san-golf'>Sân Golf</NavItem>
                <NavItem to='/nha-hang'>Nhà Hàng</NavItem>
                <NavItem to='/tin-tuc'>Tin Tức</NavItem>
                <ContactButton to='/lien-he'>Liên Hệ</ContactButton>
              </NavItems>
            </NavContainer>
          </NavInner>
        </HeroNavigation>
        <SubTitle>{subTitle}</SubTitle>
        <Title>{title}</Title>
        <SearchForm>
          <SearchOption value={searchType} onChange={this.handleChangeType}>
            <MenuItem value='hotel'>Tìm Phòng</MenuItem>
            <MenuItem value='golf'>Tìm Sân Golf</MenuItem>
            <MenuItem value='restaurant'>Tìm Nhà Hàng</MenuItem>
          </SearchOption>
          <SearchInput autoFocus placeholder='Địa chỉ, khách sạn, thành phố' />
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </SearchForm>
        <BGImage />
      </Wrapper>
    );
  }
}

export default Hero;
