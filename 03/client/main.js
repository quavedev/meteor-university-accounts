import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '../ui/App';
import '../api/methods/ContactsMethods';
import '../api/methods/TransactionsMethods';

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});
