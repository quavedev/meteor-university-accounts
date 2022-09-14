import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Modal } from './components/Modal';
import { SelectContact } from './components/SelectContact';
import { ContactsCollection } from '../api/collections/ContactsCollection';
import { WalletsCollection } from '../api/collections/WalletsCollection';
import { Loading } from './components/Loading';

export const Wallet = () => {
  const { loggedUser } = useLoggedUser();
  const isLoadingContacts = useSubscribe('myContacts');
  const isLoadingWallets = useSubscribe('myWallet');
  const contacts = useFind(() =>
    ContactsCollection.find(
      { archived: { $ne: true } },
      { sort: { createdAt: -1 } }
    )
  );
  const [wallet] = useFind(() => WalletsCollection.find());
  const [open, setOpen] = React.useState(false);
  const [isTransferring, setIsTransferring] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [destinationContact, setDestinationContact] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');

  const addTransaction = () => {
    Meteor.call(
      'transactions.insert',
      {
        isTransferring,
        sourceWalletId: wallet?._id,
        destinationContactId: destinationContact?._id || '',
        amount: Number(amount),
      },
      (errorResponse) => {
        if (errorResponse) {
          if (errorResponse.details) {
            errorResponse.details.forEach((error) => {
              setErrorMessage(error.message);
            });
          } else {
            setErrorMessage(errorResponse.error);
          }
        } else {
          setOpen(false);
          setDestinationContact({});
          setAmount(0);
          setErrorMessage('');
        }
      }
    );
  };

  if (isLoadingContacts() || isLoadingWallets()) {
    return <Loading />;
  }

  return (
    <>
      <div className="my-10 flex font-sans shadow-md">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="mt-2 w-full flex-none text-sm font-medium text-gray-500">
              Email:
            </div>
            <h1 className="flex-auto text-lg font-semibold text-gray-700">
              {loggedUser?.email}
            </h1>
            <div className="mt-2 w-full flex-none text-sm font-medium text-gray-500">
              Wallet ID:
            </div>
            <h1 className="flex-auto text-lg font-semibold text-gray-700">
              {wallet?._id}
            </h1>
            <div className="text-2xl font-bold text-gray-700">{`${wallet.balance} ${wallet.currency}`}</div>
          </div>
          <div className="flex space-x-4 text-sm font-medium">
            <div className="mt-4 flex flex-auto space-x-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                onClick={() => {
                  setIsTransferring(false);
                  setErrorMessage('');
                  setOpen(true);
                }}
              >
                Add money
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                onClick={() => {
                  setIsTransferring(true);
                  setErrorMessage('');
                  setOpen(true);
                }}
              >
                Transfer money
              </button>
            </div>
          </div>
        </form>
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        title={
          isTransferring
            ? 'Transfer money to other wallet'
            : 'Add money to your wallet'
        }
        body={
          <>
            {isTransferring && (
              <div className="mt-2">
                <SelectContact
                  title="Destination contact"
                  contacts={contacts}
                  contact={destinationContact}
                  setContact={setDestinationContact}
                />
              </div>
            )}

            <div className="mt-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                min={0}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </>
        }
        footer={
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            onClick={addTransaction}
          >
            {isTransferring ? 'Transfer' : 'Add'}
          </button>
        }
        errorMessage={errorMessage}
      />
    </>
  );
};
