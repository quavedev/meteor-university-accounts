import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { SignUp } from './SignUp';
import { RoutePaths } from './RoutePaths';

export const Router = () => (
  <Routes>
    <Route path={RoutePaths.HOME} element={<Home />} />
    <Route path={RoutePaths.SIGN_UP} element={<SignUp />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
