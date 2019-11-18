import Category from '../models/Categories';

class CreditCategoryController {
  async index(req, res) {
    const categories = await Category.findAll({
      where: { is_credit: true, is_visible: true },
      attributes: [
        'id',
        'category_name',
        'is_credit',
        'created_at',
        'updated_at',
      ],
    });
    return res.json(categories);
  }
}

export default new CreditCategoryController();
