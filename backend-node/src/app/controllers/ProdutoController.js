import * as Yup from 'yup';
import Produto from '../models/Produto';

class ProdutoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      code: Yup.string().required(),
      price: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const produtoExists = await Produto.findOne({
      where: { code: req.body.code },
    });

    if (produtoExists) {
      return res.status(400).json({ error: 'Produto already exists.' });
    }
    const { name, code, price, description } = await Produto.create(req.body);
    return res.json({
      name,
      code,
      price,
      description,
    });
  }

  async index(req, res) {
    const produto = await Produto.findAll({
      attributes: ['id', 'name', 'code', 'price', 'description'],
    });

    return res.json(produto);
  }

  async delete(req, res) {
    const produtoExists = await Produto.findByPk(req.params.id);

    if (!produtoExists) {
      return res.status(400).json({ error: 'Produto not exists.' });
    }

    await produtoExists.destroy(req.params.id);

    return res.json(`Produto id = ${produtoExists.id} deleted`);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      code: Yup.string().required(),
      price: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const produto = await Produto.findByPk(req.params.id);
    const { id, name, code, price, description } = await produto.update(req.body);

    return res.json({
      id,
      name,
      code,
      price,
      description,
    });
  }
}

export default new ProdutoController();
