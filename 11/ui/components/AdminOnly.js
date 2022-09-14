import { Meteor } from 'meteor/meteor';

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Loading } from './Loading';
import { RoutePaths } from '../RoutePaths';

export const AdminOnly = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState();
  const { isLoadingLoggedUser } = useLoggedUser();
  const location = useLocation();
  useEffect(() => {
    Meteor.call('roles.isAdmin', (error, isAdminResult) => {
      if (error) {
        setIsAdmin(false);
        return;
      }

      setIsAdmin(isAdminResult);
    });
  }, []);

  if (isLoadingLoggedUser || isAdmin == null) {
    return <Loading />;
  }

  if (!isAdmin) {
    return (
      <Navigate to={RoutePaths.ACCESS} state={{ from: location }} replace />
    );
  }

  return children;
};
