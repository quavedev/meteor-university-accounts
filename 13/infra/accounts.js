import { Accounts } from 'meteor/accounts-base';
import { WalletsCollection } from '../api/collections/WalletsCollection';

Accounts.onCreateUser((options, user) => {
  const customizedUser = { ...user };

  WalletsCollection.insert({ userId: user._id, createdAt: new Date() });

  customizedUser.email = user.emails[0].address;
  return customizedUser;
});

Accounts.setDefaultPublishFields({
  ...Accounts._defaultPublishFields.projection,
  email: 1,
});
