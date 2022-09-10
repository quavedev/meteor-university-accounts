import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../collections/ContactsCollection.js';

Meteor.publish('allContacts', function publishAllContacts() {
  return ContactsCollection.find();
});

Meteor.publish('contacts', function publishContacts() {
  const contacts = ContactsCollection.find(
    { archived: { $ne: true } },
    {
      fields: {
        createdAt: false,
      },
    }
  );
  return contacts;
});
