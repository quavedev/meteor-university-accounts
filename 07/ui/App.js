import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { Router } from './Router';

export const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <div className="min-h-full">
        <div className="mx-auto max-w-4xl p-2">
          <Router />
        </div>
      </div>
    </div>
  </BrowserRouter>
);
