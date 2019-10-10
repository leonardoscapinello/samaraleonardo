import Sequelize, { Model } from 'sequelize';

class Transactions extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: Sequelize.INTEGER,
        id_category: Sequelize.INTEGER,
        id_wallet: Sequelize.INTEGER,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        amount: Sequelize.DOUBLE,
        is_credit: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
    this.belongsTo(models.Category, {
      foreignKey: 'id_category',
      as: 'category',
    });
    this.belongsTo(models.Wallet, { foreignKey: 'id_wallet', as: 'wallet' });
  }
}

export default Transactions;
