import Sequelize from 'sequelize';
import Transactions from '../app/models/Transactions';
import Wallet from '../app/models/Wallets';

const Dashboard = () => {
  return {
    sumCredits: async () => {
      return Transactions.findOne({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_credits'],
        ],
        raw: true,
        where: {
          is_credit: true,
        },
      });
    },
    sumDebits: async () => {
      return Transactions.findOne({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_debits'],
        ],
        raw: true,
        where: {
          is_credit: false,
        },
      });
    },
    sumCreditCartPayments: async () => {
      return Transactions.findOne({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'cc_payments'],
        ],
        raw: true,
        where: {
          is_credit: true,
        },
        include: [
          {
            model: Wallet,
            as: 'wallet',
            where: {
              wallet_type: `CC`,
            },
            attributes: [],
            required: true,
          },
        ],
      });
    },
    sumCreditCartExpenses: async () => {
      return Transactions.findOne({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'cc_expenses'],
        ],
        raw: true,
        where: {
          is_credit: false,
        },
        include: [
          {
            model: Wallet,
            as: 'wallet',
            where: {
              wallet_type: `CC`,
            },
            attributes: [],
            required: true,
          },
        ],
      });
    },
  };
};

export default Dashboard;
