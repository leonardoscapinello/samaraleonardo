module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', 'id_wallet', {
      options: {
        type: 'UNIQUE',
      },
      name: 'id_wallet_fk',
      references: {
        model: 'Wallets',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'id_wallet');
  },
};
