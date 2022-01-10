import Sequelize, { Model } from 'sequelize';

class Compra extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        total: Sequelize.DOUBLE,
        type_payment: Sequelize.STRING,
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Produto, {
      foreignKey: 'produto_id',
      as: 'produtos',
    });
  }

}

export default Compra;