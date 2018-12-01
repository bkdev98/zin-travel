import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Layout from '../components/layout';
import ServiceCard from '../components/service-card';

const Wrapper = styled.div`
  margin-top: 80px;
`;

const Container = styled.div`
  padding: 40px 0px 0px 0px;
  max-width: 1200px;
  margin: 0px auto;
`;

const HeaderOverlay = styled.div`
  height: 30vh;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(.7);
  position: absolute;
  width: 100%;
  transition: all 0.3s;
  :hover {
    filter: brightness(.9);
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  h3 {
    z-index: 1;
    color: white;
    font-weight: 400;
    font-size: 40px;
  }
`;

const Title = styled.h3`
  font-weight: 600;
  margin-bottom: 20px;
`;

const Empty = styled.p`
  font-size: 16px;
  margin-left: 40px;
`;

const NhaHangPage = ({ data: { home, featuredServices, allServices } }) => (
  <Layout>
    <Wrapper>
      <Header>
        <HeaderOverlay image={home.edges[0].node.restaurantImage} />
        <h3>Dịch vụ Nhà Hàng</h3>
      </Header>
      <Container>
        <Title>Dịch vụ nổi bật</Title>
        <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Row>
            {featuredServices ? featuredServices.edges.map(({ node }) => (
              <Col lg={3} md={6} sm={12} key={node.id}>
                <ServiceCard data={node.frontmatter} slug={node.fields.slug} />
              </Col>
            )) : <Empty>Không tìm thấy dịch vụ!</Empty>}
          </Row>
        </Grid>
      </Container>
      <Container>
        <Title>Đặt bàn nhà hàng</Title>
        <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Row>
            {allServices ? allServices.edges.map(({ node }) => (
              <Col lg={3} md={6} sm={12} key={node.id}>
                <ServiceCard data={node.frontmatter} slug={node.fields.slug} />
              </Col>
            )) : <Empty>Không tìm thấy dịch vụ!</Empty>}
          </Row>
        </Grid>
      </Container>
    </Wrapper>
  </Layout>
);

export default NhaHangPage;

export const pageQuery = graphql`
  query NhaHangQuery {
    home: allPagesYaml(filter: { title: { ne: null } }) {
      edges {
        node {
          restaurantImage
        }
      }
    }
    featuredServices: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/services/" }, frontmatter: { featured: { eq: true }, type: { eq: "restaurant" } } }
      sort: { fields: [frontmatter___createdAt], order: DESC }
      limit: 12
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
    allServices: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/services/" }, frontmatter: { type: { eq: "restaurant" } } }
      sort: { fields: [frontmatter___createdAt], order: DESC }
      limit: 24
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
