/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import Wallet from '../models/Wallets';
import WalletsResume from '../../services/wallets';

class CreditWalletsController {
  async index(req, res) {
    const wallets = await Wallet.findAll({
      where: { is_credit: true, wallet_type: ['MN', 'DC'] },
      attributes: [
        'id',
        'name',
        'wallet_type',
        'icon',
        'color',
        'credit_limit',
        'due_day',
      ],
      order: [['name', 'ASC']],
    });

    const finalObject = [];

    for (const wallet of wallets) {
      const currentItem = wallet.dataValues;
      const { id } = await currentItem;
      const { sum_credits } = await WalletsResume.sumCredits(id);
      const { sum_debits } = await WalletsResume.sumDebits(id);
      const sum_account_value = sum_credits - sum_debits || 0;
      currentItem.account_value = JSON.parse(sum_account_value.toFixed(2));
      finalObject.push(currentItem);
    }
    return res.json(finalObject);
  }
}

export default new CreditWalletsController();
