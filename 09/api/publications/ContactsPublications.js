import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../collections/ContactsCollection.js';

Meteor.publish('myContacts', function publishContacts() {
  const { userId } = this;
  if (!userId) {
    throw Meteor.Error('Access denied');
  }
  return ContactsCollection.find(
    { userId, archived: { $ne: true } },
    {
      fields: {
        createdAt: false,
      },
    }
  );
});
