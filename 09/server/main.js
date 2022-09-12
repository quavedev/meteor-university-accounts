import { Meteor } from 'meteor/meteor';
import '../api/collections/ContactsCollection';
import '../api/collections/TransactionsCollection';
import { WalletsCollection } from '../api/collections/WalletsCollection';
import '../api/methods/ContactsMethods';
import '../api/methods/TransactionsMethods';
import '../api/publications/ContactsPublications';
import '../api/publications/WalletsPublications';
import '../infra/CustomError';
import '../infra/accounts';

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      createdAt: new Date(),
    });
  }
});
