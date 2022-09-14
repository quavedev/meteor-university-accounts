import React from 'react';

import { Wallet } from './Wallet';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Loading } from './components/Loading';
import { RoutePaths } from './RoutePaths';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
  const navigate = useNavigate();
  if (isLoadingLoggedUser) {
    return <Loading />;
  }

  if (!loggedUser) {
    return (
      <div className="flex flex-col items-center p-12">
        <div>Welcome!</div>
        <div>
          Please{' '}
          <a
            className="cursor-pointer text-indigo-800"
            onClick={() => navigate(RoutePaths.ACCESS)}
          >
            sign-up
          </a>
          .
        </div>
      </div>
    );
  }
  return (
    <>
      <Wallet />
      <ContactForm />
      <ContactList />
    </>
  );
};
