import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .positive(),
      plan_id: Yup.number()
        .integer()
        .positive(),
      start_date: Yup.date(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
