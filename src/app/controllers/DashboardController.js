import Dashboard from '../../services/dashboard';

class DashboardController {
  async index(req, res) {
    const credits = await Dashboard().sumCredits();
    // const total_debits = await Dashboard().sumCredits();

    const result = {
      total_credits: credits,
    };

    return res.status(200).json(result);
  }
}

export default new DashboardController();
