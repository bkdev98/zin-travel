import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import moment from 'moment';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { IntlProvider, addLocaleData, injectIntl, FormattedMessage } from 'react-intl';
import enData from 'react-intl/locale-data/en';
import viData from 'react-intl/locale-data/vi';
import { compose } from 'recompose';
import ReactMarkdown from 'react-markdown';

import Navbar from './navbar';
import Footer from './footer';
import './layout.css';
import ArticleCard from './article-card';

import en from '../locale/en.json';
import vi from '../locale/vi.json';

const messages = { en, vi };

addLocaleData([...enData, ...viData]);

const Wrapper = styled.div`
  margin-top: 80px;
`;

const Container = styled.div`
  margin: 0px auto;
  padding: 0px 20px;
  max-width: 1200px;
`;

const FeaturedImage = styled.img`
  background-color: #D4AF65;
  border-radius: 6px;
  height: 40vh;
  width: 100%;
  object-fit: cover;
  filter: brightness(85%);
  transition: all 0.4s ease;
  :hover {
    filter: brightness(120%);
  }
`;

const Category = styled.h5`
  color: #D4AF65;
  text-transform: uppercase;
  font-size: 16px;
  margin: 25px 0px 20px;
  letter-spacing: 0.5px;
  font-weight: 400;
  display: inline-block;
`;

const Title = styled.h3`
  font-size: 30px;
  margin-bottom: 10px;
  line-height: 35px;
`;

const Date = styled(Category)`
  color: #4A4A4A;
  font-weight: 600;
  margin: 0px 0px 25px;
  font-size: 14px;
`;

const Content = styled.div`
  div {
    font-size: 16px;
    margin-top: 20px;
    p {
      margin-bottom: 10px;
    }
  }
`;

const RelatedTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const Empty = styled.p`
  font-size: 16px;
  margin-left: 40px;
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

const MyHelmet = ({ intl, locale }) => (
  <Helmet
    title={intl.formatMessage({ id: 'site.title' })}
    meta={[
      { name: 'description', content: intl.formatMessage({ id: 'site.description' }) },
      { name: 'keywords', content: 'du lịch, zin travel, traveling, hotel, restaurant' },
    ]}
  >
    <html lang={locale} />
  </Helmet>
);

const InjectedHelmet = compose(injectIntl)(MyHelmet);

const ArticleLayout = ({ data: { article, relatedArticles }, pageContext: { locale } }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <>
      <InjectedHelmet locale={locale} />
      <Navbar />
      <Wrapper>
        <Container>
          <Category>
            <span>{(locale === 'en' && article.frontmatter.tagsEng)
              ? article.frontmatter.tagsEng.join(', ')
              : article.frontmatter.tags.join(', ')}</span>
          </Category>
          <Title>{(locale === 'en' && article.frontmatter.titleEng)
            ? article.frontmatter.titleEng
            : article.frontmatter.title}</Title>
          <Date><FormattedMessage id='article.createdAt' />: {moment(article.frontmatter.createdAt).calendar()}</Date>
          <FeaturedImage src={article.frontmatter.thumbnail} alt={article.frontmatter.title} />
          <Content>
            {(locale === 'en' && article.frontmatter.bodyEng)
              ? <div><ReactMarkdown source={article.frontmatter.bodyEng} /></div>
              : <div dangerouslySetInnerHTML={{ __html: article.html }} />}
          </Content>
          <RelatedTitle><FormattedMessage id='article.related' /></RelatedTitle>
          <Grid fluid style={{ padding: 0 }}>
            <Row>
              {relatedArticles ? relatedArticles.edges.map(({ node }) => (
                <Col md={3} sm={12} key={node.id}>
                  <ArticleCard
                    small
                    locale={locale}
                    data={node.frontmatter}
                    slug={node.fields.slug}
                    excerpt={node.excerpt}
                  />
                </Col>
              )) : <Empty>Không có bài viết liên quan</Empty>}
            </Row>
          </Grid>
          <ShowAll to='/tin-tuc'><FormattedMessage id='article.seeAll' /></ShowAll>
        </Container>
      </Wrapper>
      <Footer locale={locale} />
    </>
  </IntlProvider>
);

export default ArticleLayout;

export const query = graphql`
  query ($slug: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        titleEng
        thumbnail
        createdAt
        tags
        tagsEng
        bodyEng
      }
    }
    relatedArticles: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/articles/" }, fields: { slug: { ne: $slug } } }
      sort: { fields: [frontmatter___createdAt], order: DESC }
      limit: 4
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
