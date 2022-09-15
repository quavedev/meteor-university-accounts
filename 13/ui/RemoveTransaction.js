import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useAlert } from 'meteor/quave:alert-react-tailwind';
import { RoutePaths } from './RoutePaths';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from './components/ErrorAlert';

export const RemoveTransaction = () => {
  const { openAlert } = useAlert();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState();

  const removeTransaction = (e) => {
    e.preventDefault();
    Meteor.call('transactions.remove', transactionId, (err) => {
      if (err) {
        console.error('Error trying to remove a transaction', err);
        setError(err);
        return;
      }
      setTransactionId('');
      setError(null);
      openAlert('The transaction removed!');
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg text-base font-medium">
        Remove to Transaction
      </h3>
      {error && <ErrorAlert message={error.reason || 'Unknown error'} />}
      <form className="mt-6 flex flex-col">
        <div className="flex flex-col space-y-4">
          <div className="">
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-700"
            >
              Transaction ID
            </label>
            <input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-center py-3">
          <button
            onClick={() => navigate(RoutePaths.HOME)}
            className="inline-flex  justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Back to Home
          </button>

          <button
            onClick={removeTransaction}
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};
