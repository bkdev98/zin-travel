import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Navbar from './navbar';
import Footer from './footer';
import './layout.css';

const Layout = ({ data: { markdownRemark: article } }) => (
  <>
    <Helmet
      title={article.frontmatter.title}
      meta={[
        { name: 'description', content: 'Zin Travel' },
        { name: 'keywords', content: 'du lịch, zin travel' },
      ]}
    >
      <html lang="en" />
    </Helmet>
    <Navbar />
    Bai viet <h1>{article.frontmatter.title}</h1>
    <Footer />
  </>
);

export default Layout;

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        thumbnail
        createdAt
      }
    }
  }
`;
