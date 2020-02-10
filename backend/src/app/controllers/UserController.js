import Sequelize from 'sequelize';
import User from '../models/User';
import Register from '../models/Register';

import Cache from '../../lib/Cache';

class UserController {
  async index(req, res) {
    const { id } = req.params;
    const name = req.query.q;
    const { page = 1 } = req.query;

    if (id) {
      const user = await User.findByPk(id);
      return res.json(user);
    }

    if (name) {
      const { Op } = Sequelize;
      const users = await User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        attributes: ['id', 'name', 'email', 'admin'],
        order: ['name'],
      });

      return res.json(users);
    }

    const cacheKey = `users:${page}`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'admin', 'age', 'weight', 'height'],
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    await Cache.set(cacheKey, users);

    return res.json(users);
  }

  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ error: ' Email alredy exist ' });
    }

    if (!req.body.password) {
      req.body.password = '123456';
    }

    try {
      const { id, name, email, age, height, weight } = await User.create(
        req.body
      );

      await Cache.invalidatePrefix('users');

      return res.json({
        id,
        name,
        email,
        age,
        height,
        weight,
      });
    } catch (error) {
      return res.json(error);
    }
  }

  async update(req, res) {
    const user = await User.findByPk(req.params.id);

    if (req.body.oldPassword) {
      const { oldPassword } = req.body;
      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not match' });
      }
    }

    const email = req.body.email ? req.body.email : '';

    if (email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
        paranoid: false,
      });

      if (userExist) {
        if (userExist.id !== user.id)
          return res.status(402).json({ error: 'Email alredy exist' });
      }
    }

    const { id, name, age, height, weight } = await user.update(req.body);

    await Cache.invalidatePrefix('users');

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const existRegister = await Register.findOne({
      where: {
        student_id: id,
      },
    });

    if (existRegister) {
      return res.status(401).json({ error: 'User have a register' });
    }

    const user = await User.findByPk(id);

    await user.destroy();

    await Cache.invalidatePrefix('users');

    return res.json({ delete: 'Deleted successfull' });
  }
}

export default new UserController();
