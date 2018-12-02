require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// gatsby-config.js
const myQuery = `{
  allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/services/" } }
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
}`;

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) => data.allMarkdownRemark.edges.map(({ node }) => node), // optional
    // indexName: 'index name to target', // overrides main index name, optional
  },
];

module.exports = {
  siteMetadata: {
    title: 'Zin Travel | Dịch vụ du lịch của bạn',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'zin-travel',
        short_name: 'zin-travel',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/logo.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/static/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: `${__dirname}/static/articles`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'services',
        path: `${__dirname}/static/services`,
      },
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    'gatsby-plugin-netlify-cms',
  ],
};
