import HelpOrder from '../models/HelpOrder';
import User from '../models/User';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';
import Cache from '../../lib/Cache';

class HelpOrderController {
  async index(req, res) {
    const studentId = Number(req.params.id);
    const { page = 1 } = req.query;
    let questions = [];

    const cacheKey = studentId
      ? `student:${studentId}:helpOrders:${page}`
      : `helpOrders:${page}`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    if (!studentId) {
      questions = await HelpOrder.findAll({
        include: [
          {
            model: User,
            as: 'student',
            attributes: ['name'],
          },
        ],
        order: [['created_at', 'DESC']],
        limit: 20,
        offset: (page - 1) * 20,
      });
    } else {
      questions = await HelpOrder.findAll({
        where: {
          student_id: studentId,
        },
        include: [
          {
            model: User,
            as: 'student',
            attributes: ['name'],
          },
        ],
        order: [['created_at', 'DESC']],
        limit: 10,
        offset: (page - 1) * 10,
      });
    }

    await Cache.set(cacheKey, questions);

    return res.json(questions);
  }

  async store(req, res) {
    const studentId = Number(req.params.id);

    const existStudent = await User.findByPk(studentId);
    if (!existStudent) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const { question } = req.body;

    const { id, student_id } = await HelpOrder.create({
      student_id: studentId,
      question,
    });

    return res.json({
      id,
      student_id,
      question,
    });
  }

  async update(req, res) {
    const helpOrder = await HelpOrder.findByPk(Number(req.params.id));

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order does not exist' });
    }

    const { answer } = req.body;

    const { id, question, student_id, answer_at } = await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    const student = await User.findByPk(student_id);

    await Queue.add(AnswerMail.key, {
      student,
      question,
      answer,
    });

    return res.json({
      id,
      student_id,
      question,
      answer,
      answer_at,
    });
  }
}

export default new HelpOrderController();
