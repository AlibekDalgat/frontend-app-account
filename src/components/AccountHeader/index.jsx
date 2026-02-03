import React from 'react';

import { AppContext } from '@edx/frontend-platform/react';
import Header from '@edx/frontend-component-header';

import { useAccountHeaderMenu } from './hooks';

import './index.scss';

export const AccountHeader = () => {
  const { authenticatedUser, config: appConfig } = React.useContext(AppContext);

  const catalogUrl = appConfig.COURSE_CATALOG_URL
    || appConfig.DISCOVERY_BASE_URL
    || `${appConfig.LMS_BASE_URL}/courses`;

  const headerMenu = useAccountHeaderMenu({
    catalogUrl,
    authenticatedUser,
  });

  return (
    <Header
      mainMenuItems={headerMenu.mainMenu}
      secondaryMenuItems={headerMenu.secondaryMenu}
      userMenuItems={headerMenu.userMenu}
    />
  );
};