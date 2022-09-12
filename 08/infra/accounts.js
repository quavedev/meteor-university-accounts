import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from '../ui/RoutePaths';

Accounts.emailTemplates.resetPassword.html = (user, url) =>
  `Reset your password with this link: ${url}`;

Accounts.urls.resetPassword = (token) =>
  Meteor.absoluteUrl(`${RoutePaths.RESET_PASSWORD.substring(1)}/${token}`);
