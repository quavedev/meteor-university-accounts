import React from 'react';

import { Wallet } from './Wallet';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';

export const Home = () => (
  <>
    <Wallet />
    <ContactForm />
    <ContactList />
  </>
);
