import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from '../ui/RoutePaths';
import { WalletsCollection } from '../api/collections/WalletsCollection';

Accounts.emailTemplates.resetPassword.html = (user, url) =>
  `Hello,<br/><br/>Reset your password with this link: ${url}`;

Accounts.urls.resetPassword = (token) =>
  Meteor.absoluteUrl(`${RoutePaths.RESET_PASSWORD.substring(1)}/${token}`);

Accounts.onCreateUser((options, user) => {
  WalletsCollection.insert({
    createdAt: new Date(),
    userId: user._id,
  });
  const customizedUser = { ...user };
  customizedUser.email = user.emails[0].address;
  return customizedUser;
});

Accounts.setDefaultPublishFields({
  ...Accounts._defaultPublishFields.projection,
  email: 1,
});
