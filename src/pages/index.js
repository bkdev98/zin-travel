import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { graphql, Link } from 'gatsby';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Layout from '../components/layout';
import Hero from '../components/hero';
import ServiceCard from '../components/service-card';

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
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
  color: #4A4A4A;
`;

const Wrapper = styled.div`
  padding: 50px 0px 0px;
  max-width: 1200px;
  margin: 0px auto;
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
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
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

const ShowAll = styled(Link)`
  color: #D4AF65;
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0px;
  text-decoration: none;
  position: relative;
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

const IndexPage = ({ data: { home, services } }) => (
  <Layout hideNavbar>
    <Hero title={home.edges[0].node.title} subTitle={home.edges[0].node.subTitle} />
    <Wrapper>
      <Title>Dịch vụ dành cho bạn</Title>
      <CategoryList>
        <Category image={home.edges[0].node.hotelImage}>
          <p>Khách Sạn</p>
        </Category>
        <Category image={home.edges[0].node.golfImage}>
          <p>Sân Golf</p>
        </Category>
        <Category image={home.edges[0].node.restaurantImage}>
          <p>Nhà Hàng</p>
        </Category>
      </CategoryList>
    </Wrapper>
    <Wrapper>
      <Title>Ưu đãi từ Zin Travel</Title>
      <SubTitle>Những dịch vụ nóng hổi gần bạn nhất</SubTitle>
      <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          {services.edges.map(({ node }) => (
            <Col lg={3} md={6} sm={12} key={node.id}>
              <ServiceCard data={node.frontmatter} slug={node.fields.slug} />
            </Col>
          ))}
        </Row>
      </Grid>
      <ShowAll>Tất cả ưu đãi (100+)</ShowAll>
    </Wrapper>
    <Wrapper>
      <Title>Tin tức mới nhất về du lịch</Title>
      <ShowAll>Đọc thêm (20+)</ShowAll>
    </Wrapper>
  </Layout>
);

export default withStyles(styles)(IndexPage);

export const pageQuery = graphql`
  query IndexQuery {
    home: allPagesYaml(filter: { title: { ne: null } }) {
      edges {
        node {
          title
          subTitle
          golfImage
          hotelImage
          restaurantImage
        }
      }
    }
    services: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/services/" } }
      sort: { fields: [frontmatter___createdAt], order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            createdAt
            images
            type
            address
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
