module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('categories', 'is_visible', {
      type: Sequelize.BOOLEAN,
      default: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('categories', 'is_visible');
  },
};
