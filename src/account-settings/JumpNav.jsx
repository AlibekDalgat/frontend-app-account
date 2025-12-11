import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { breakpoints, useWindowSize } from '@openedx/paragon';
import classNames from 'classnames';
import React from 'react';
import { NavHashLink } from 'react-router-hash-link';
import Scrollspy from 'react-scrollspy';
import messages from './AccountSettingsPage.messages';

const JumpNav = ({
  intl,
}) => {
  const stickToTop = useWindowSize().width > breakpoints.small.minWidth;

  return (
    <div className={classNames('jump-nav', { 'position-sticky': stickToTop })}>
      <Scrollspy
        items={[
          'basic-information',
          'professional-information',
          'profile-information',
          'social-media',
          'site-preferences',
          'linked-accounts',
          'delete-account',
        ]}
        className="list-unstyled"
        currentClassName="font-weight-bold"
        offset={-64}
      >
        <li>
          <NavHashLink to="#basic-information">
            {intl.formatMessage(messages['account.settings.section.account.information'])}
          </NavHashLink>
        </li>
        <li>
          <NavHashLink to="#professional-information">
            {intl.formatMessage(messages['professional-information.preferences.professional-information.label'])}
          </NavHashLink>
        </li>
        <li>
          <NavHashLink to="#profile-information">
            {intl.formatMessage(messages['account.settings.section.profile.information'])}
          </NavHashLink>
        </li>
        <li>
          <NavHashLink to="#social-media">
            {intl.formatMessage(messages['account.settings.section.social.media'])}
          </NavHashLink>
        </li>
        <li>
          <NavHashLink to="#site-preferences">
            {intl.formatMessage(messages['account.settings.section.site.preferences'])}
          </NavHashLink>
        </li>
        <li>
          <NavHashLink to="#linked-accounts">
            {intl.formatMessage(messages['account.settings.section.linked.accounts'])}
          </NavHashLink>
        </li>
        {getConfig().ENABLE_ACCOUNT_DELETION
          && (
          <li>
            <NavHashLink to="#delete-account">
              {intl.formatMessage(messages['account.settings.jump.nav.delete.account'])}
            </NavHashLink>
          </li>
          )}
      </Scrollspy>
    </div>
  );
};

JumpNav.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(JumpNav);
