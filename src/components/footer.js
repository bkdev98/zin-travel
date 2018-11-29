import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'gatsby';

import logo from '../images/logo-black.png';

const Wrapper = styled.div`
  margin-top: 50px;
  border-top: 1px solid #d8d8d8;
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
  p {
    font-size: 16px;
  }
`;

const Actions = styled.div`
  display: flex;
`;

const Action = styled.button`
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 5px 12px;
  font-size: 14px;
  color: #4A4A4A;
  margin-left: 10px;
  font-weight: 600;
`;

const Footer = () => (
  <Wrapper>
    <Inner>
      <Grid fluid>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <Link to='/'>
              <Logo />
            </Link>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <ListHeader>Dịch vụ</ListHeader>
            <ul>
              <ListItem>
                <Link>Đặt phòng khách sạn</Link>
              </ListItem>
              <ListItem>
                <Link>Đặt phòng sân Golf</Link>
              </ListItem>
              <ListItem>
                <Link>Đặt phòng nhà hàng</Link>
              </ListItem>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <ListHeader>Zin Travel</ListHeader>
            <ul>
              <ListItem>
                <Link>Điều khoản sử dụng</Link>
              </ListItem>
              <ListItem>
                <Link>Chính sách bảo mật</Link>
              </ListItem>
              <ListItem>
                <Link>Site Map</Link>
              </ListItem>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <ListHeader>Liên Hệ</ListHeader>
            <ul>
              <ListItem>
                <Link>Facebook</Link>
              </ListItem>
              <ListItem>
                <Link>Email</Link>
              </ListItem>
            </ul>
          </Col>
        </Row>
      </Grid>
      <Divider />
      <Bottom>
        <p>© Bản quyền thuộc về <strong>Zin Travel CO.,LTD</strong></p>
        <Actions>
          <Action>Tiếng Việt</Action>
          <Action>VNĐ</Action>
        </Actions>
      </Bottom>
    </Inner>
  </Wrapper>
);

export default Footer;
