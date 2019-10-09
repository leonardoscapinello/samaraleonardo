module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('wallets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      class: {
        type: Sequelize.ENUM,
        values: ['CC', 'DC', 'MN'],
        defaultValue: 'MN',
      },
      icon: {
        type: Sequelize.STRING,
        defaultValue: 'dollar',
      },
      color: {
        type: Sequelize.STRING,
        defaultValue: '#000000',
      },
      credit_limit: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
      },
      due_day: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('wallets');
  },
};
