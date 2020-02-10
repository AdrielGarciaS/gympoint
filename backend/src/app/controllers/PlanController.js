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
        order: ['title'],
      });

      return res.json(plans);
    }

    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      order: ['title'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(plans);
  }

  async store(req, res) {
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
