import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../collections/ContactsCollection.js';

Meteor.publish('allContacts', function publishAllContacts() {
  return ContactsCollection.find();
});

Meteor.publish('contacts', function publishContacts() {
  return ContactsCollection.find(
    { archived: { $ne: true } },
    {
      fields: {
        createdAt: false,
      },
    }
  );
});
