import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import enData from 'react-intl/locale-data/en';
import viData from 'react-intl/locale-data/vi';
import { compose } from 'recompose';

import Navbar from './navbar';
import Footer from './footer';
import './layout.css';

import en from '../locale/en.json';
import vi from '../locale/vi.json';

const messages = { en, vi };

addLocaleData([...enData, ...viData]);

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

const Layout = ({ hideNavbar, children, locale }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <>
      <InjectedHelmet locale={locale} />
      {!hideNavbar && <Navbar />}
      {children}
      <Footer locale={locale} />
    </>
  </IntlProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
