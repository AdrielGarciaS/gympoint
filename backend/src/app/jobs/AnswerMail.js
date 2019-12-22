import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { student, question, answer } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua dúvida foi respondida',
      template: 'answer',
      context: {
        name: student.name,
        question,
        answer,
      },
    });
  }
}

export default new AnswerMail();
