import { differenceInDays } from 'date-fns';
import Checkin from '../models/Checkin';
import User from '../models/User';

class CheckinController {
  async index(req, res) {
    const studentId = Number(req.params.id);

    const checkins = await Checkin.findAll({
      where: {
        student_id: studentId,
      },
      attributes: ['id', 'student_id', 'created_at'],
      order: [['created_at', 'DESC']],
      limit: 5,
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const existStudent = await User.findByPk(req.params.id);
    if (!existStudent) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const studentId = Number(req.params.id);

    const checkins = await Checkin.findAll({
      where: {
        student_id: studentId,
      },
    });

    const lastCheckins = checkins.filter(checkin => {
      const differenceDays = differenceInDays(checkin.createdAt, new Date());
      if (differenceDays >= -7) {
        return checkin;
      }
    });

    if (lastCheckins.length >= 5) {
      return res.status(403).json({
        error: `You had ${lastCheckins.length} checkins on last 7 days`,
      });
    }

    const { student_id, createdAt } = await Checkin.create({
      student_id: studentId,
    });

    return res.json({
      student_id,
      createdAt,
    });
  }
}

export default new CheckinController();
