import React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';

function renderImage(file) {
  if (file) {
    return <Img fluid={file.node.childImageSharp.fluid} />;
  }
  return null;
}

const Image = function ({ src }) {
  return (<StaticQuery
    query={graphql`
      query {
        images: allFile(filter:{ extension: { regex: "/jpeg|jpg|png|gif/"}}) {
        edges {
          node {
            extension
            relativePath
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }`}
    render={({ images }) => renderImage(images.edges.find(
      image => image.node.relativePath === src || image.node.relativePath === src.substring(8)
    ))}
  />);
};

export default Image;
