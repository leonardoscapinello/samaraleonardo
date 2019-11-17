const defaults = [
  {
    category_name: 'Saque',
    is_credit: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    category_name: 'Depósito',
    is_credit: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    category_name: 'Retirada',
    is_credit: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    category_name: 'Pagamento',
    is_credit: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
