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
      credits: total_credits,
      debits: total_debits,
      difference: total_result,
      credit_card: {
        expenses: cc_expenses || 0,
        payments: cc_payments || 0,
        difference: parseFloat(cc_difference),
      },
    });
  }
}

export default new DashboardController();
