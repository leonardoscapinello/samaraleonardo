import nodemailer from 'nodemailer';
import * as Yup from 'yup';
import mailerConf from '../config/mailer';

const Mailer = () => {
  return {
    send: async requestBody => {
      const schema = Yup.object().shape({
        to: Yup.string()
          .email()
          .required(),
        subject: Yup.string()
          .min(3)
          .max(60)
          .required(),
        body: Yup.string()
          .min(3)
          .required(),
      });
      if (!(await schema.isValid(requestBody))) {
        return 'validation';
      }

      const { to, subject, body } = requestBody;
      const mailOptions = {
        from: mailerConf.transporter.auth.user,
        to,
        subject,
        html: body,
      };
      return nodemailer
        .createTransport(mailerConf.transporter)
        .sendMail(mailOptions, error => {
          if (error) {
            return 'error';
          }
          return 'sent';
        });
    },
  };
};

export default Mailer;
