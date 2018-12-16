import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FormattedMessage } from 'react-intl';
import { StaticQuery, graphql, navigate } from 'gatsby';
import { Location } from '@reach/router';

import logo from '../images/logo-black.png';
import Link from './link';
import locales from '../locale/locales';
import { media } from '../utils/media';

const Wrapper = styled.div`
  margin-top: 50px;
  border-top: 1px solid #d8d8d8;
  ${media.tablet`
    padding-bottom: 65px;
  `};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0px auto;
  padding: 30px 0px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #d8d8d8;
  margin: 20px 0px;
`;

const Logo = styled.div`
  width: 130px;
  height: 130px;
  background-image: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const ListHeader = styled.h4`
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  list-style: none;
  font-size: 16px;
  margin-bottom: 12px;
  a {
    color: #4A4A4A;
    text-decoration: none;
    :hover {
      color: #D4AF65;
    }
    transition: all 0.3s;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  p {
    font-size: 16px;
  }
`;

const Actions = styled.div`
  display: flex;
`;

const Action = styled.option`
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 5px 12px;
  font-size: 14px;
  color: #4A4A4A;
  margin-left: 10px;
  font-weight: 600;
  :hover {
    background: #d8d8d8;
  }
`;

const changeLanguage = (locale, pathname) => {
  Object.keys(locales).forEach(lang => {
    if (!locales[lang].default && pathname.indexOf(`/${lang}/`) === 0) {
      pathname = pathname.substring(3); // eslint-disable-line
    }
  });
  switch (locale) {
    case 'vi':
      return navigate(pathname);
    case 'en':
      return navigate(`/en${pathname}`);
    default: return;
  }
};

const Footer = ({ locale }) => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        contact: allPagesYaml(filter: { companyName: { ne: null } }) {
          edges {
            node {
              companyName
            }
          }
        }
      }
    `}
    render={({ contact }) => (
      <Wrapper>
        <Inner>
          <Grid fluid>
            <Row>
              <Col sm={6} md={6} lg={3}>
                <Link to='/'>
                  <Logo />
                </Link>
              </Col>
              <Col sm={6} md={6} lg={3}>
                <ListHeader>
                  <FormattedMessage id='footer.service' />
                </ListHeader>
                <ul>
                  <ListItem>
                    <Link to='/khach-san'>
                      <FormattedMessage id='footer.hotelService' />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to='/san-golf'>
                      <FormattedMessage id='footer.golfService' />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to='/nha-hang'>
                      <FormattedMessage id='footer.restaurantService' />
                    </Link>
                  </ListItem>
                </ul>
              </Col>
              <Col sm={6} md={6} lg={3}>
                <ListHeader>Zin Travel</ListHeader>
                <ul>
                  <ListItem>
                    <Link to='/'><FormattedMessage id='footer.termsOfUse' /></Link>
                  </ListItem>
                  <ListItem>
                    <Link to='/'><FormattedMessage id='footer.privacyPolicy' /></Link>
                  </ListItem>
                  <ListItem>
                    <Link to='/'>Site Map</Link>
                  </ListItem>
                </ul>
              </Col>
              <Col sm={6} md={6} lg={3}>
                <ListHeader>
                  <FormattedMessage id='footer.contact' />
                </ListHeader>
                <ul>
                  <ListItem>
                    <Link to='/'>Facebook</Link>
                  </ListItem>
                  <ListItem>
                    <Link to='/'>Email</Link>
                  </ListItem>
                </ul>
              </Col>
            </Row>
          </Grid>
          <Divider />
          <Bottom>
            <p><FormattedMessage id='footer.copyright' /> <strong>{contact.edges[0].node.companyName}</strong></p>
            <Actions>
              <Location>
                {({ location }) => (
                  <select value={locale} onChange={e => changeLanguage(e.target.value, location.pathname)}>
                    <Action value='vi'>Tiếng Việt</Action>
                    <Action value='en'>English</Action>
                  </select>
                )}
              </Location>
              <Action>VNĐ</Action>
            </Actions>
          </Bottom>
        </Inner>
      </Wrapper>
    )}
  />
);

export default Footer;
