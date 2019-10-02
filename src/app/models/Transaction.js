import Sequelize, { Model } from 'sequelize';

class Transaction extends Model {
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

  /* static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  } */
}

export default Transaction;
