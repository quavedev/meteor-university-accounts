import { Meteor } from 'meteor/meteor';

import { Roles } from 'meteor/alanning:roles';
import { WalletRoles } from '../../infra/WalletRoles';

Meteor.methods({
  'roles.isAdmin'() {
    const { userId } = this;
    if (!userId) {
      throw new Error('Access denied');
    }

    return Roles.userIsInRole(userId, WalletRoles.ADMIN);
  },
});
