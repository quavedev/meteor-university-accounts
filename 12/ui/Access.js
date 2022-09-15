import React from 'react';
import { Passwordless } from 'meteor/quave:accounts-passwordless-react';
import { RoutePaths } from './RoutePaths';
import { useNavigate } from 'react-router-dom';

export const Access = () => {
  const navigate = useNavigate();

  const onEnterToken = () => {
    navigate(RoutePaths.HOME);
  };

  return <Passwordless onEnterToken={onEnterToken} />;
};
