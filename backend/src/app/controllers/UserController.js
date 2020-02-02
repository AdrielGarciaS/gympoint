import * as Yup from 'yup';
import Sequelize from 'sequelize';
import User from '../models/User';
import Register from '../models/Register';

class UserController {
  async index(req, res) {
    const { id } = req.params;

    if (id) {
      const user = await User.findByPk(id);
      return res.json(user);
    }

    const name = req.query.q;
    const { page = 1 } = req.query;

    if (name) {
      const { Op } = Sequelize;
      const users = await User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        attributes: ['id', 'name', 'email', 'admin'],
      });

      return res.json(users);
    }

    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'admin', 'age', 'weight', 'height'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    users.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      // password: Yup.string()
      //   .required()
      //   .min(6),
      age: Yup.number()
        .integer()
        .positive(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .integer()
        .positive(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const user = await User.findByPk(req.params.id);

    if (req.body.oldPassword) {
      const { oldPassword } = req.body;
      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not match' });
      }
    }

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

    return res.json({ delete: 'Deleted successfull' });
  }
}

export default new UserController();
