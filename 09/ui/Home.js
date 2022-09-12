import React from 'react';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Wallet } from './Wallet';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
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
      <div className="flex flex-col items-center space-y-5 pt-12 text-xl">
        <div>Welcome!</div>
        <div>
          Please{' '}
          <a
            onClick={() => navigate(RoutePaths.ACCESS)}
            className="cursor-pointer text-indigo-800"
          >
            {' '}
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
