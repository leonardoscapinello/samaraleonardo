import * as Yup from 'yup';
import { Op } from 'sequelize';
import moment from 'moment';
import Transactions from '../models/Transactions';
import User from '../models/Users';

class TransactionController {
  async store(req, res) {
    const intervalDate = moment()
      .subtract(2, 'days')
      .toDate();
    const schema = Yup.object().shape({
      id_user: Yup.number()
        .integer()
        .required(),
      id_wallet: Yup.number()
        .integer()
        .required(),
      id_category: Yup.number()
        .integer()
        .required(),
      title: Yup.string()
        .min(6)
        .max(32)
        .required(),
      description: Yup.string(),
      amount: Yup.number()
        .moreThan(0)
        .required(),
      is_credit: Yup.boolean().default(false),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const transactionCount = await Transactions.findAndCountAll({
      where: {
        title: req.body.title,
        amount: req.body.amount,
        is_credit: req.body.is_credit,
        created_at: {
          [Op.gte]: intervalDate,
        },
      },
    });

    if (transactionCount.count > 0) {
      return res.status(400).json({
        error: `There is already a transaction with the same title, value, and species registered in the last 48 hours.`,
      });
    }

    const {
      id,
      id_user,
      id_wallet,
      id_category,
      title,
      description,
      amount,
      is_credit,
    } = await Transactions.create(req.body);
    return res.status(201).json({
      id,
      id_user,
      id_wallet,
      id_category,
      title,
      description,
      amount,
      is_credit,
    });
  }

  async index(req, res) {
    const transactions = await Transactions.findAll({
      where: {},
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
      ],
    });
    return res.json(transactions);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .required(),
    });
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const transactions = await Transactions.findOne({
      where: {
        id: req.params.id,
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
      ],
    });
    return res.json(transactions);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .required(),
      id_user: Yup.number()
        .integer()
        .required(),
      id_wallet: Yup.number()
        .integer()
        .required(),
      id_category: Yup.number()
        .integer()
        .required(),
      title: Yup.string()
        .min(6)
        .max(32)
        .required(),
      description: Yup.string(),
      amount: Yup.number()
        .moreThan(0)
        .required(),
      is_credit: Yup.boolean().default(false),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const transaction = await Transactions.findByPk(req.body.id);
    const {
      id,
      id_user,
      id_wallet,
      id_category,
      title,
      description,
      amount,
      is_credit,
    } = await transaction.update(req.body);
    return res.status(201).json({
      id,
      id_user,
      id_wallet,
      id_category,
      title,
      description,
      amount,
      is_credit,
    });
  }
}

export default new TransactionController();
