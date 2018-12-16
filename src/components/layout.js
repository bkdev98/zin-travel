import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import enData from 'react-intl/locale-data/en';
import viData from 'react-intl/locale-data/vi';
import { compose } from 'recompose';

import Navbar from './navbar';
import Footer from './footer';
import './layout.css';
import MobileMenu from './mobile-menu';

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

class Layout extends Component {
  state = { menuOpen: false }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { hideNavbar, children, locale } = this.props;
    const { menuOpen } = this.state;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { toggleMenu: this.toggleMenu })
    );

    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div id='outer-container'>
          <InjectedHelmet locale={locale} />
          <MobileMenu
            toggleMenu={this.toggleMenu}
            isOpen={menuOpen}
            pageWrapId={'page-wrap'}
          />
          {!hideNavbar && <Navbar toggleMenu={this.toggleMenu} />}
          <div id='page-wrap'>
            {childrenWithProps}
          </div>
          <Footer locale={locale} />
        </div>
      </IntlProvider>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
