import Transactions from '../models/Transactions';
import User from '../models/Users';
import Wallet from '../models/Wallets';
import Category from '../models/Categories';

class CreditsController {
  async index(req, res) {
    const transactions = await Transactions.findAll({
      where: {
        is_credit: true,
      },
      attributes: [
        'id',
        'id_wallet',
        'id_category',
        'title',
        'description',
        'amount',
        'is_credit',
        'created_at',
      ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'category_name', 'is_credit'],
        },
        {
          model: Wallet,
          as: 'wallet',
          attributes: ['id', 'name', 'wallet_type', 'icon', 'color'],
        },
      ],
    });
    return res.json(transactions);
  }
}

export default new CreditsController();
