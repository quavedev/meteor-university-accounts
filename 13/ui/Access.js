import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Passwordless } from 'meteor/quave:accounts-passwordless-react';
import { useNavigate } from 'react-router-dom';

export const Access = () => {
  const navigate = useNavigate();

  const onEnterToken = () => {
    navigate('/');
  };

  const loginWithGoogle = () => {
    Meteor.loginWithGoogle({ loginStyle: 'redirect' });
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <Passwordless onEnterToken={onEnterToken} />
      <div className="font-light">or</div>
      <button
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        onClick={loginWithGoogle}
      >
        Login With Google
      </button>
    </div>
  );
};
