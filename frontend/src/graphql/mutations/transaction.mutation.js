import { gql } from "@apollo/client";

export const CREATING_TRANSACTION = gql`
  mutation CreateTransaction($input: createTransactionInput!) {
    createTransaction(input: $input) {
      _id
      description
      category
      paymentType
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: updateTransactionInput!) {
    updateTransaction(input: $input) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
