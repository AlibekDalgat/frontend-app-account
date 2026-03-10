import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'formdata-polyfill';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import {
  subscribe, initialize, APP_INIT_ERROR, APP_READY, mergeConfig, getConfig
} from '@edx/frontend-platform';
import React, { StrictMode } from 'react';
// eslint-disable-next-line import/no-unresolved
import { createRoot } from 'react-dom/client';
import { Route, Routes, Outlet } from 'react-router-dom';

import { AccountHeader } from './components/AccountHeader';
import CustomFooter from './components/CustomFooter';

import configureStore from './data/configureStore';
import AccountSettingsPage, { NotFoundPage } from './account-settings';
import IdVerificationPageSlot from './plugin-slots/IdVerificationPageSlot';
import messages from './i18n';

import './index.scss';
import Head from './head/Head';

const applyWidgetTheme = () => {
  const config = getConfig();
  const root = document.documentElement;

  root.style.setProperty('--primary', '#2F2F60');
  root.style.setProperty('--primary-light', '#EDE8F5');

  if (!config.WIDGET_MODE) {
    return;
  }

  root.style.setProperty('--primary', config.WIDGET_BRAND_PRIMARY);
  root.style.setProperty('--primary-light', config.WIDGET_BRAND_PRIMARY_LIGHT);

  if (config.WIDGET_MODE && config.WIDGET_LOGO_URL) {
    document.body.setAttribute('data-widget-mode', 'true');
    document.documentElement.style.setProperty('--widget-logo-url', `url(${config.WIDGET_LOGO_URL})`);
  } else {
    document.body.removeAttribute('data-widget-mode');
  }
};

const rootNode = createRoot(document.getElementById('root'));
subscribe(APP_READY, () => {
  applyWidgetTheme();
  rootNode.render(
    <StrictMode>
      <AppProvider store={configureStore()}>
        <Head />
        <Routes>
          <Route element={(
            <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
              <div className="app-header-fixed">
                <AccountHeader />
              </div>
              <main className="flex-grow-1" id="main">
                <Outlet />
              </main>
              <div className="app-footer">
                <CustomFooter />
              </div>
            </div>
        )}
          >
            <Route
              path="/id-verification/*"
              element={<IdVerificationPageSlot />}
            />
            <Route path="/" element={<AccountSettingsPage />} />
            <Route path="/notfound" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </StrictMode>,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  rootNode.render(<ErrorPage message={error.message} />);
});

initialize({
  messages,
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        SUPPORT_URL: process.env.SUPPORT_URL,
        SHOW_EMAIL_CHANNEL: process.env.SHOW_EMAIL_CHANNEL || 'false',
        ENABLE_COPPA_COMPLIANCE: (process.env.ENABLE_COPPA_COMPLIANCE || false),
        ENABLE_ACCOUNT_DELETION: (process.env.ENABLE_ACCOUNT_DELETION !== 'false'),
        COUNTRIES_WITH_DELETE_ACCOUNT_DISABLED: JSON.parse(process.env.COUNTRIES_WITH_DELETE_ACCOUNT_DISABLED || '[]'),
        ENABLE_DOB_UPDATE: (process.env.ENABLE_DOB_UPDATE || false),
        MARKETING_EMAILS_OPT_IN: (process.env.MARKETING_EMAILS_OPT_IN || false),
        PASSWORD_RESET_SUPPORT_LINK: process.env.PASSWORD_RESET_SUPPORT_LINK,
        LEARNER_FEEDBACK_URL: process.env.LEARNER_FEEDBACK_URL,
      }, 'App loadConfig override handler');
    },
  },
});
