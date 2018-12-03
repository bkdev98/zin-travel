import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { graphql, Link } from 'gatsby';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Layout from '../components/layout';
import Hero from '../components/hero';
import ServiceCard from '../components/service-card';
import ArticleCard from '../components/article-card';

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

const Category = styled(Link)`
  height: 140px;
  width: 286px;
  position: relative;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  margin-right: 20px;
  img {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    border-radius: 6px;
    left: 0;
    filter: brightness(85%);
    transition: all 0.4s ease;
    :hover {
      filter: brightness(120%);
    }
  }
  span {
    font-size: 22px;
    margin: 0px;
    z-index: 1;
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

const IndexPage = ({ data: { home, services, articles }, savedServices, pageContext: { locale } }) => (
  <Layout locale={locale} hideNavbar>
    <Hero />
    <Wrapper>
      <Title>
        <FormattedMessage id='home.servicesForYou' />
      </Title>
      <CategoryList>
        <Category to='/khach-san'>
          <img src={home.edges[0].node.hotelImage} />
          <FormattedMessage id='type.hotel' />
        </Category>
        <Category to='/san-golf'>
          <img src={home.edges[0].node.golfImage} />
          <FormattedMessage id='type.golf' />
        </Category>
        <Category to='/nha-hang'>
          <img src={home.edges[0].node.restaurantImage} />
          <FormattedMessage id='type.restaurant' />
        </Category>
      </CategoryList>
    </Wrapper>
    <Wrapper>
      <Title>
        <FormattedMessage id='home.fromZinTravel' />
      </Title>
      <SubTitle>
        <FormattedMessage id='home.fromZinTravelSub' />
      </SubTitle>
      <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          {services.edges.map(({ node }) => (
            <Col lg={3} md={6} sm={12} key={node.id}>
              <ServiceCard data={node.frontmatter} slug={node.fields.slug} />
            </Col>
          ))}
        </Row>
      </Grid>
      <ShowAll to='/dich-vu'>
        <FormattedMessage id='home.allServices' />
      </ShowAll>
    </Wrapper>
    {savedServices.length ? <Wrapper>
      <Title>
        <FormattedMessage id='home.savedServices' />
      </Title>
      <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          {savedServices.map(item => (
            <Col lg={3} md={6} sm={12} key={item.id}>
              <ServiceCard data={item.frontmatter} slug={item.fields.slug} />
            </Col>
          ))}
        </Row>
      </Grid>
    </Wrapper> : null}
    <Wrapper>
      <Title>
        <FormattedMessage id='home.newsTitle' />
      </Title>
      <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          {articles && articles.edges[0] && (
            <Col lg={6} md={4} sm={12}>
              <ArticleCard
                large
                data={articles.edges[0].node.frontmatter}
                slug={articles.edges[0].node.fields.slug}
                excerpt={articles.edges[0].node.excerpt}
              />
            </Col>
          )}
          {articles && articles.edges[1] && (
            <Col lg={3} md={4} sm={12}>
              <ArticleCard
                data={articles.edges[1].node.frontmatter}
                slug={articles.edges[1].node.fields.slug}
                excerpt={articles.edges[1].node.excerpt}
              />
            </Col>
          )}
          {articles && articles.edges[2] && (
            <Col lg={3} md={4} sm={12}>
              <ArticleCard
                data={articles.edges[2].node.frontmatter}
                slug={articles.edges[2].node.fields.slug}
                excerpt={articles.edges[2].node.excerpt}
              />
            </Col>
          )}
        </Row>
      </Grid>
      <ShowAll to='/tin-tuc'>
        <FormattedMessage id='home.readmore' />
      </ShowAll>
    </Wrapper>
  </Layout>
);

export default connect(state => ({
  savedServices: state.services.saved,
}))(withStyles(styles)(IndexPage));

export const pageQuery = graphql`
  query IndexQuery {
    home: allPagesYaml(filter: { title: { ne: null } }) {
      edges {
        node {
          golfImage
          hotelImage
          restaurantImage
        }
      }
    }
    services: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/services/" }, frontmatter: { featured: { eq: true } } }
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
            price
            type
            address
          }
          fields {
            slug
          }
        }
      }
    }
    articles: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/articles/" } }
      sort: { fields: [frontmatter___createdAt], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            createdAt
            thumbnail
            tags
          }
          fields {
            slug
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`;
