export const WalletEvent = {
  Approved: 'tx-approved',
  Approving: 'tx-approving',
  Failed: 'tx-failed',
  Confirm: 'tx-confirm',
  Pending: 'tx-pending',
  Success: 'tx-success',
};

export const StatusType = {
  Error: 'error',
  Information: 'information',
  Success: 'success',
  Warning: 'warning',
};

export const TransactionType = {
  TokenToEth: 'TokenToEth',
  TokenToEthApprove: 'TokenToEthApprove',
  EthToToken: 'EthToToken',
  Deposit: 'Deposit',
};

export const Message = {
  Deposit: {
    Failed: 'Transaction failed',
    Confirm: 'Transaction need to be confirmed',
    Pending: 'Processing transaction',
    Success: 'Transaction completed',
  },
  TokenToEth: {
    Failed: 'Transaction failed',
    Confirm: 'Transaction need to be confirmed',
    Pending: 'Processing transaction',
    Success: 'Transaction completed',
  },
  EthToToken: {
    Failed: 'Transaction failed',
    Confirm: 'Transaction need to be confirmed',
    Pending: 'Processing transaction',
    Success: 'Transaction completed',
  },
  TokenToEthApprove: {
    Confirm: 'Transaction needs to be approved',
    Pending: 'Processing transaction',
    Success: 'Transaction has been approved',
    Failed: 'Transaction failed',
  },
};
