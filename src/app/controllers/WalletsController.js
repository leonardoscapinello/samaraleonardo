/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';
import Wallet from '../models/Wallets';
import WalletsResume from '../../services/wallets';

class WalletsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .max(32)
        .required(),
      wallet_type: Yup.string()
        .oneOf(['MN', 'CC', 'DC'])
        .required(),
      icon: Yup.string().required(),
      color: Yup.string()
        .max(7)
        .required(),
      credit_limit: Yup.number().moreThan(0),
      due_day: Yup.number()
        .integer()
        .moreThan(0)
        .lessThan(32)
        .when('credit_limit', (credit_limit, field) =>
          credit_limit ? field.required() : field
        ),
      is_credit: Yup.boolean().default(false),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { name } = req.body;
    const walletExist = await Wallet.findOne({ where: { name } });
    if (walletExist) {
      return res.status(400).json({ error: 'Wallet already exists.' });
    }

    const {
      id,
      wallet_type,
      icon,
      color,
      credit_limit,
      due_day,
    } = await Wallet.create(req.body);
    return res.json({
      id,
      name,
      wallet_type,
      icon,
      color,
      credit_limit,
      due_day,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .max(32)
        .required(),
      wallet_type: Yup.string()
        .oneOf(['MN', 'CC', 'DC'])
        .required(),
      icon: Yup.string().required(),
      color: Yup.string()
        .max(7)
        .required(),
      credit_limit: Yup.number().moreThan(0),
      due_day: Yup.number()
        .integer()
        .moreThan(0)
        .lessThan(32)
        .when('credit_limit', (credit_limit, field) =>
          credit_limit ? field.required() : field
        ),
      is_credit: Yup.boolean().default(false),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { name } = req.body;
    const walletExist = await Wallet.findOne({ where: { name } });
    if (walletExist) {
      return res
        .status(400)
        .json({ error: 'Wallet already exists with this name.' });
    }

    const wallet = await Wallet.findByPk(req.body.id);

    if (!wallet) {
      return res
        .status(400)
        .json({ error: `Wallet not found with this identifier` });
    }

    const {
      id,
      wallet_type,
      icon,
      color,
      credit_limit,
      due_day,
    } = await wallet.update(req.body);
    return res.status(200).json({
      id,
      name,
      wallet_type,
      icon,
      color,
      credit_limit,
      due_day,
    });
  }

  async index(req, res) {
    const wallets = await Wallet.findAll({
      where: {},
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
      const sum_account_value = (sum_credits - sum_debits).toFixed(2);
      currentItem.account_value = sum_account_value;
      finalObject.push(currentItem);
      console.log(`pushed ${id}`);
    }

    console.log(`-------------------------`);
    console.log(finalObject);
    return res.json(finalObject);
  }

  async show(req, res) {
    const wallets = await Wallet.findOne({
      where: {
        id: req.params.id,
      },
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
    return res.json(wallets);
  }
}

export default new WalletsController();
