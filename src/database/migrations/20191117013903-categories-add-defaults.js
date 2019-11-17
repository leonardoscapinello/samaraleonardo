const defaults = [
  { category_name: 'Saque', is_credit: false },
  { category_name: 'Depósito', is_credit: true },
  { category_name: 'Retirada', is_credit: false },
  { category_name: 'Pagamento', is_credit: true },
];
module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('categories', defaults);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
