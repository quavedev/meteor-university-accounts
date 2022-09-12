import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from './RoutePaths';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorAlert } from './components/ErrorAlert';
import { useAlert } from 'meteor/quave:alert-react-tailwind';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const { openAlert } = useAlert();
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const resetPassword = (e) => {
    e.preventDefault();
    Accounts.resetPassword(token, password, (err) => {
      if (err) {
        console.error('Error resetting password', err);
        setError(err);
        return;
      }
      openAlert('New password set. Please sign in!');
      // TODO ALERT
      navigate(RoutePaths.ACCESS);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg text-base font-medium">
        Reset your password
      </h3>
      {error && <ErrorAlert message={error.reason || 'Unknown error'} />}
      <form className="mt-6 flex flex-col">
        <div className="flex flex-col space-y-4">
          <div className="">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={resetPassword}
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};
