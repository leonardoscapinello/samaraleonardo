import Dashboard from '../../services/dashboard';

class DashboardController {
  async index(req, res) {
    const { total_credits } = await Dashboard().sumCredits();
    const { total_debits } = await Dashboard().sumDebits();
    const { cc_payments } = await Dashboard().sumCreditCartPayments();
    const { cc_expenses } = await Dashboard().sumCreditCartExpenses();
    const total_result = (total_credits - total_debits).toFixed(2);
    const cc_difference = (cc_payments - cc_expenses).toFixed(2);
    return res.status(200).json({
      credits: parseFloat(total_credits, 2) || 0,
      debits: parseFloat(total_debits, 2) || 0,
      difference: parseFloat(total_result, 2) || 0,
      credit_card: {
        expenses: parseFloat(cc_expenses, 2) || 0,
        payments: parseFloat(cc_payments, 2) || 0,
        difference: parseFloat(cc_difference, 2),
      },
    });
  }
}

export default new DashboardController();
