import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import SimpleSchema from 'simpl-schema';
import {
  TransactionsCollection,
  TRANSFER_TYPE,
  ADD_TYPE,
} from '../collections/TransactionsCollection';
import { WalletRoles } from '../../infra/WalletRoles';

Meteor.methods({
  'transactions.insert'(args) {
    const { userId } = this;
    if (!userId) {
      throw Meteor.Error('Access denied');
    }
    const schema = new SimpleSchema({
      isTransferring: {
        type: Boolean,
      },
      sourceWalletId: {
        type: String,
      },
      destinationContactId: {
        type: String,
        optional: !args.isTransferring,
      },
      amount: {
        type: Number,
        min: 1,
      },
    });
    const cleanArgs = schema.clean(args);
    schema.validate(cleanArgs);
    const { isTransferring, sourceWalletId, destinationContactId, amount } =
      args;
    return TransactionsCollection.insert({
      type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
      sourceWalletId,
      destinationContactId: isTransferring ? destinationContactId : null,
      amount,
      createdAt: new Date(),
      userId,
    });
  },
  'transactions.remove'(transactionId) {
    const { userId } = this;
    if (!userId) {
      throw Meteor.Error('Access denied');
    }
    check(transactionId, String);

    if (!Roles.userIsInRole(userId, WalletRoles.ADMIN)) {
      throw new Error('Permission denied');
    }

    return TransactionsCollection.remove(transactionId);
  },
});
