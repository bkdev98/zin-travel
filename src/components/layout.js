import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Navbar from './navbar';
import './layout.css';

const Layout = ({ hideNavbar, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Zin Travel' },
            { name: 'keywords', content: 'du lịch, zin travel' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        {!hideNavbar && <Navbar siteTitle={data.site.siteMetadata.title} />}
        <div>
          {children}
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
