import React, { memo } from "react";
import { ContactsCollection } from "../api/collections/ContactsCollection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { Loading } from "./components/Loading";

export const ContactList = () => {
  const isLoading = useSubscribe("contacts");
  const contacts = useFind(() =>
    ContactsCollection.find(
      { archived: { $ne: true } },
      { sort: { createdAt: -1 } }
    )
  );

  const removeContact = (event, _id) => {
    event.preventDefault();
    Meteor.call("contacts.archive", { contactId: _id });
  };

  const ContactItem = memo(({ contact }) => {
    return (
      <li className="py-4 flex items-center justify-between space-x-3">
        <div className="min-w-0 flex-1 flex items-center space-x-3">
          {contact.imageUrl && (
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={contact.imageUrl}
                alt=""
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {contact.name}
            </p>
            <p className="text-sm font-medium text-gray-500 truncate">
              {contact.email}
            </p>
            <p className="text-sm font-medium text-gray-500 truncate">
              {contact.walletId}
            </p>
          </div>
          <div>
            <a
              href="#"
              onClick={(event) => removeContact(event, contact._id)}
              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            >
              Archive
            </a>
          </div>
        </div>
      </li>
    );
  });

  if (isLoading()) {
    return <Loading />;
  }
  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
        </ul>
      </div>
    </div>
  );
};
