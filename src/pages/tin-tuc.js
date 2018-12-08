import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FormattedMessage } from 'react-intl';

import ArticleCard from '../components/article-card';

import Layout from '../components/layout';

const Wrapper = styled.div`
  margin-top: 80px;
`;

const Container = styled.div`
  margin: 0px auto;
  max-width: 1200px;
  a {
    color: #4A4A4A;
    text-decoration: none;
  }
`;

const Title = styled.h3`
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 100px;
`;

const FeaturedImage = styled.img`
  background-color: #D4AF65;
  border-radius: 6px;
  height: 300px;
  width: 100%;
  object-fit: cover;
  filter: brightness(85%);
  transition: all 0.4s ease;
  :hover {
    filter: brightness(120%);
  }
`;

const FeaturedCategory = styled.h5`
  color: #D4AF65;
  text-transform: uppercase;
  font-size: 14px;
  margin: 8px 0px;
  letter-spacing: 0.5px;
  font-weight: 400;
  display: inline-block;
`;

const FeaturedTitle = styled.h3`
  font-size: 24px;
  margin: 10px 0px 5px;
  line-height: 28px;
`;

const FeaturedExcerpt = styled.p`
  color: #4A4A4A;
  font-size: 14px;
  margin: 10px 0px;
`;

const FeaturedDate = styled(FeaturedCategory)`
  color: #4A4A4A;
  position: absolute;
  bottom: 10px;
  font-weight: 600;
`;

const TinTucPage = ({ data: { articles }, pageContext: { locale } }) => (
  <Layout locale={locale}>
    <Wrapper>
      <Container>
        <Title><FormattedMessage id='news.title' /></Title>
        <Link to={`/tin-tuc${articles.edges[0].node.fields.slug}`}>
          <Row>
            <Col sm={12} md={6} lg={7}>
              <FeaturedImage src={articles.edges[0].node.frontmatter.thumbnail} />
            </Col>
            <Col sm={12} md={6} lg={5} style={{ position: 'relative' }}>
              <FeaturedCategory>
                <span>{locale === 'en' && articles.edges[0].node.frontmatter.tagsEng
                  ? articles.edges[0].node.frontmatter.tagsEng.join(', ')
                  : articles.edges[0].node.frontmatter.tags.join(', ')}</span>
              </FeaturedCategory>
              <FeaturedTitle>
                {locale === 'en' && articles.edges[0].node.frontmatter.titleEng
                  ? articles.edges[0].node.frontmatter.titleEng
                  : articles.edges[0].node.frontmatter.title}
              </FeaturedTitle>
              <FeaturedExcerpt>
                {articles.edges[0].node.excerpt}
              </FeaturedExcerpt>
              <FeaturedDate>
                <FormattedMessage id='news.createdAt' /> {articles.edges[0].node.frontmatter.createdAt}
              </FeaturedDate>
            </Col>
          </Row>
        </Link>
        <Grid fluid style={{ padding: 0, marginTop: 10 }}>
          <Row>
            {articles && articles.edges.map(({ node }, idx) => idx !== 0 && (
              <Col sm={12} md={6} lg={4} key={node.id}>
                <ArticleCard
                  locale={locale}
                  small
                  data={node.frontmatter}
                  slug={node.fields.slug}
                  excerpt={node.excerpt}
                />
              </Col>
            ))}
          </Row>
        </Grid>
      </Container>
    </Wrapper>
  </Layout>
);

export default TinTucPage;

export const pageQuery = graphql`
  query TinTucQuery {
    articles: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/articles/" } }
      sort: { fields: [frontmatter___createdAt], order: DESC }
      limit: 20
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            titleEng
            createdAt
            thumbnail
            tags
            tagsEng
          }
          fields {
            slug
          }
          excerpt(pruneLength: 150)
        }
      }
    }
  }
`;
