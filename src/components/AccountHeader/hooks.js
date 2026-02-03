import { useIntl } from '@edx/frontend-platform/i18n';

import getAccountHeaderMenu from './AccountHeaderMenu';

export const useAccountHeaderMenu = ({ catalogUrl, authenticatedUser }) => {
  const { formatMessage } = useIntl();
  return getAccountHeaderMenu(formatMessage, catalogUrl, authenticatedUser);
};