import * as Yup from 'yup';
import Compra from '../models/Compra';
import Produto from '../models/Produto';

class CompraController {
  async store(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
      total: Yup.string().required(),
      type_payment: Yup.string().required(),
      status: Yup.string().required(),
      produtos: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const compraExists = await Compra.findOne({
      where: { code: req.body.code },
    });

    if (compraExists) {
      return res.status(400).json({ error: 'Compra already exists.' });
    }

    const { produtos, code, total, type_payment, status } = req.body;

    const compra = { code, total, type_payment, status } = await Compra.create(req.body);

    const savedProdutos = await Produto.bulkCreate(
      produtos.map(el => ({ ...el, produto_id: compra.id }))
    );

    return res.json({ compra, produtos: savedProdutos });

  }

  async index(req, res) {
    const compra = await Compra.findAll({
      attributes: ['code', 'total', 'type_payment', 'status'],
      include: [
        { 
            model: Produto,
            as: 'produtos'
        }
    ]
    });

    return res.json(compra);
  }

  async delete(req, res) {
    const compraExists = await Compra.findByPk(req.params.id);

    if (!compraExists) {
      return res.status(400).json({ error: 'Compra not exists.' });
    }

    await compraExists.destroy(req.params.id);

    return res.json(`Compra id = ${compraExists.id} deleted`);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
      total: Yup.string().required(),
      type_payment: Yup.string().required(),
      status: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const compra = await Compra.findByPk(req.params.id);
    const { code, total, type_payment, status } = await compra.update(req.body);

    return res.json({
      code,
      total,
      type_payment,
      status,
    });
  }
}

export default new CompraController();
