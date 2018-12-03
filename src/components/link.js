import React from 'react';
import { Link as GastbyLink } from 'gatsby';
import { injectIntl } from 'react-intl';

import locales from '../locale/locales';

const Link = ({ to, intl: { locale }, ...props }) => {
  const path = locales[locale].default ? to : `/${locale}${to}`;

  return <GastbyLink {...props} to={path} />;
};

export default injectIntl(Link);
