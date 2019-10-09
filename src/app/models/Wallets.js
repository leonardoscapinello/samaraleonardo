import Sequelize, { Model } from 'sequelize';

class Wallet extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        wallet_type: {
            type: Sequelize.ENUM,
            values: ['CC', 'DC', 'MN'],
            defaultValue: 'MN',
        },
        icon: Sequelize.STRING,
        color: Sequelize.STRING,
        credit_limit: Sequelize.DOUBLE,
        due_day: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  //static associate(models) {
  //  this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
  //}
}

export default Wallet;
