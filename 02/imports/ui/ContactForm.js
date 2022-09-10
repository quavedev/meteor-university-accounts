import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ErrorAlert } from './components/ErrorAlert';
import { SuccessAlert } from './components/SuccessAlert';

export const ContactForm = () => {
  const [name, setName] = React.useState(''); // Formik
  const [email, setEmail] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [walletId, setWalletId] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const showError = ({ message }) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  const showSuccess = ({ message }) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess('');
    }, 5000);
  };

  const saveContact = () => {
    Meteor.call(
      'contacts.insert',
      { name, email, imageUrl, walletId },
      (errorResponse) => {
        if (errorResponse) {
          showError({ message: errorResponse.error });
        } else {
          setName('');
          setEmail('');
          setImageUrl('');
          setWalletId('');
          showSuccess({ message: 'Contact saved.' });
        }
      }
    );
  };

  return (
    <form className="mt-6">
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6">
          <label
            htmlFor="walletId"
            className="block text-sm font-medium text-gray-700"
          >
            Wallet ID
          </label>
          <input
            type="text"
            id="walletId"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="px-2 py-3 text-right">
        <button
          type="button"
          onClick={saveContact}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        >
          Save Contact
        </button>
      </div>
    </form>
  );
};
