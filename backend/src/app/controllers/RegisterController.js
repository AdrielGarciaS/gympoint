import { addMonths, parseISO } from 'date-fns';

import Register from '../models/Register';
import Plan from '../models/Plan';
import User from '../models/User';

class RegisterController {
  async index(req, res) {
    const { id } = req.params;

    if (id) {
      const register = await Register.findOne({
        where: { id },
        attributes: [
          'id',
          'student_id',
          'plan_id',
          'start_date',
          'end_date',
          'price',
          'active',
        ],
        include: [
          {
            model: User,
            as: 'student',
            attributes: ['name'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['title', 'price', 'duration'],
          },
        ],
      });
      return res.json(register);
    }

    const { page = 1 } = req.query;

    const registers = await Register.findAll({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'price', 'duration'],
        },
      ],
      order: ['start_date'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(registers);
  }

  async store(req, res) {
    const existRegister = await Register.findOne({
      where: { student_id: req.body.student_id },
    });

    if (existRegister) {
      return res.status(400).json({ error: 'Student already register' });
    }

    const student = await User.findByPk(req.body.student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const plan = await Plan.findByPk(req.body.plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    const {
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await Register.create({
      ...req.body,
      end_date: addMonths(parseISO(req.body.start_date), plan.duration),
      price: plan.duration * plan.price,
    });

    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const register = await Register.findByPk(req.params.id);

    if (!register) {
      return res.status(400).json({ error: 'Register does not exist' });
    }

    let student;

    if (!req.body.student_id) {
      student = await User.findByPk(register.student_id);
    } else {
      student = await User.findByPk(req.body.student_id);
      if (!student) {
        return res.status(400).json({ error: 'Student does not exist' });
      }
    }

    let plan;

    if (!req.body.plan_id) {
      plan = await Plan.findByPk(register.plan_id);
    } else {
      plan = await Plan.findByPk(req.body.plan_id);
      if (!plan) {
        return res.status(400).json({ error: 'Plan does not exist' });
      }
    }

    let startDate;
    if (!req.body.start_date) {
      startDate = register.start_date;
    } else {
      startDate = parseISO(req.body.start_date);
    }

    const {
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await register.update({
      student_id: student.id,
      plan_id: plan.id,
      start_date: startDate,
      end_date: addMonths(startDate, plan.duration),
      price: plan.duration * plan.price,
    });

    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const register = await Register.findByPk(req.params.id);

    await register.destroy();

    return res.json({ message: 'Register deleted' });
  }
}

export default new RegisterController();
