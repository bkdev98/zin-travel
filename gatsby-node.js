const { createFilePath } = require('gatsby-source-filesystem');

const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve) => {
    graphql(`
      {
        services: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/services/" } }) {
          edges {
            node {
              frontmatter {
                type
              }
              fields {
                slug
              }
            }
          }
        }
        articles: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/articles/" } }) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.services.edges.forEach(({ node }) => {
        createPage({
          path: `dich-vu${node.fields.slug}`,
          component: path.resolve('./src/components/service-layout.js'),
          context: {
            slug: node.fields.slug,
            type: node.frontmatter.type,
          },
        });
      });
      result.data.articles.edges.forEach(({ node }) => {
        createPage({
          path: `tin-tuc${node.fields.slug}`,
          component: path.resolve('./src/components/article-layout.js'),
          context: {
            slug: node.fields.slug,
          },
        });
      });
      resolve();
    });
  });
};
