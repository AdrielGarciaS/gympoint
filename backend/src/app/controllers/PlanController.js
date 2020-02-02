import * as Yup from 'yup';
import Sequelize from 'sequelize';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { id } = req.params;

    if (id) {
      const plan = await Plan.findByPk(id);
      return res.json(plan);
    }

    const title = req.query.q;
    const { page = 1 } = req.query;
    if (title) {
      const { Op } = Sequelize;
      const plans = await Plan.findAll({
        where: {
          title: {
            [Op.iLike]: `%${title}%`,
          },
        },
        attributes: ['id', 'title', 'duration', 'price'],
      });

      return res.json(plans);
    }

    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    plans.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = req.body;

    const { id, title, price, duration } = await Plan.create(plan);

    return res.json({
      id,
      title,
      price,
      duration,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number()
        .integer()
        .positive(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.findByPk(req.params.id);

    const { id, title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    await plan.destroy();

    return res.json({ delete: 'Deleted sucessfull' });
  }
}

export default new PlanController();
