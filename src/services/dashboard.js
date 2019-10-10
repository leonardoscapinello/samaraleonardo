import Sequelize from 'sequelize';
import Transactions from '../app/models/Transactions';

const Dashboard = () => {
  return {
    sumCredits: async () => {
      const transactions = await Transactions.findOne({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_credits'],
        ],
        where: {
          is_credit: true,
        },
      });
      return transactions;
    },
  };
};

export default Dashboard;
