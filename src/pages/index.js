import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/layout';
import Hero from '../components/hero';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const Title = styled.h3`
  font-weight: 600;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #1B1B1B;
  margin-top: 15px;
`;

const Wrapper = styled.div`
  padding: 70px 130px 0px;
`;

const CategoryList = styled.div`
  display: flex;
`;

const Category = styled(Button)`
  height: 140px;
  width: 286px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url('https://source.unsplash.com/572x280/');
  && {
    text-transform: none;
    margin-right: 20px;
  }
  p {
    font-size: 22px;
    margin: 0px;
    color: #FFFFFF;
  }
`;

const IndexPage = ({ classes }) => (
  <Layout hideNavbar>
    <Hero />
    <Wrapper>
      <Title>Dịch vụ dành cho bạn</Title>
      <CategoryList>
        <Category>
          <p>Khách Sạn</p>
        </Category>
        <Category>
          <p>Sân Golf</p>
        </Category>
        <Category>
          <p>Nhà Hàng</p>
        </Category>
      </CategoryList>
    </Wrapper>
    <Wrapper>
      <Title>Ưu đãi từ Zin Travel</Title>
      <SubTitle>Những dịch vụ nóng hổi gần bạn nhất</SubTitle>

    </Wrapper>
  </Layout>
);

export default withStyles(styles)(IndexPage);
