import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        category_name: Sequelize.STRING,
        is_credit: Sequelize.BOOLEAN,
        is_visible: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Category;
