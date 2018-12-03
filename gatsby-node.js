const { createFilePath } = require('gatsby-source-filesystem');
const locales = require('./src/locale/locales');

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
        Object.keys(locales).map(lang => {
          const localizedPath = locales[lang].default
            ? `dich-vu${node.fields.slug}`
            : `${locales[lang].path}/dich-vu${node.fields.slug}`;
          return createPage({
            path: localizedPath,
            component: path.resolve('./src/components/service-layout.js'),
            context: {
              slug: node.fields.slug,
              type: node.frontmatter.type,
              locale: lang,
            },
          });
        });
      });
      result.data.articles.edges.forEach(({ node }) => {
        Object.keys(locales).map(lang => {
          const localizedPath = locales[lang].default
            ? `tin-tuc${node.fields.slug}`
            : `${locales[lang].path}/dich-vu${node.fields.slug}`;
          return createPage({
            path: localizedPath,
            component: path.resolve('./src/components/article-layout.js'),
            context: {
              slug: node.fields.slug,
              locale: lang,
            },
          });
        });
      });
      resolve();
    });
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise(resolve => {
    deletePage(page);

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path;

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
        },
      });
    });

    resolve();
  });
};
