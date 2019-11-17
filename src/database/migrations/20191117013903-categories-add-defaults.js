const defaults = [
  {
    category_name: 'Saque',
    is_credit: false,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    category_name: 'Depósito',
    is_credit: true,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    category_name: 'Retirada',
    is_credit: false,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    category_name: 'Pagamento',
    is_credit: true,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
];
module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('categories', defaults);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
