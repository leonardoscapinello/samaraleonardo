import Sequelize from 'sequelize';
import Transactions from '../app/models/Transactions';

const WalletsResume = () => {
  return {
    sumCredits: async id_wallet => {
      return Transactions.findOne({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'sum_credits'],
        ],
        raw: true,
        where: {
          is_credit: true,
          id_wallet,
        },
      });
    },
    sumDebits: async id_wallet => {
      return Transactions.findOne({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'sum_debits'],
        ],
        raw: true,
        where: {
          is_credit: false,
          id_wallet,
        },
      });
    },
  };
};

export default WalletsResume();
