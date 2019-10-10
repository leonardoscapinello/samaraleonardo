module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('transactions', ['id_category'], {
      type: 'foreign key',
      name: 'id_category_fk',
      references: {
        table: 'categories',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('transactions', 'id_category');
  },
};
