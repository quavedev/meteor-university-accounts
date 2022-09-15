import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { WalletsCollection } from './WalletsCollection';

export const TRANSFER_TYPE = 'TRANSFER';
export const ADD_TYPE = 'ADD';

export const TransactionsCollection = new Mongo.Collection('transactions');

TransactionsCollection.before.insert(function (userId, transactionDocument) {
  if (transactionDocument.type === TRANSFER_TYPE) {
    // We could also check here if destination wallet exists
    const sourceWallet = WalletsCollection.findOne(
      transactionDocument.sourceWalletId
    );
    if (!sourceWallet) {
      throw new Meteor.Error('Source wallet not found.');
    }
    if (sourceWallet.balance < transactionDocument.amount) {
      throw new Meteor.Error('Insufficient funds.');
    }
    WalletsCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: -transactionDocument.amount },
    });
  }
  if (transactionDocument.type === ADD_TYPE) {
    const sourceWallet = WalletsCollection.findOne(
      transactionDocument.sourceWalletId
    );
    if (!sourceWallet) {
      throw new Meteor.Error('Source wallet not found.');
    }
    WalletsCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: transactionDocument.amount },
    });
  }
});
TransactionsCollection.before.remove(function (userId, transactionDocument) {
  if (transactionDocument.type === TRANSFER_TYPE) {
    const sourceWallet = WalletsCollection.findOne(
      transactionDocument.sourceWalletId
    );
    if (!sourceWallet) {
      throw new Meteor.Error('Source wallet not found.');
    }
    WalletsCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: transactionDocument.amount },
    });
  }
  if (transactionDocument.type === ADD_TYPE) {
    const sourceWallet = WalletsCollection.findOne(
      transactionDocument.sourceWalletId
    );
    if (!sourceWallet) {
      throw new Meteor.Error('Source wallet not found.');
    }
    WalletsCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: -transactionDocument.amount },
    });
  }
});

const TransactionsSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [TRANSFER_TYPE, ADD_TYPE],
  },
  sourceWalletId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
  },
  destinationContactId: {
    type: String,
    optional: true,
    // regEx: SimpleSchema.RegEx.Id,
  },
  amount: {
    type: Number,
    min: 1,
  },
  createdAt: {
    type: Date,
  },
  userId: {
    type: String,
  },
});

TransactionsCollection.attachSchema(TransactionsSchema);
