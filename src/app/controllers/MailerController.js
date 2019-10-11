import mailer from '../../services/mailer';

class MailerController {
  async store(req, res) {
    const sent = await mailer().send(req.body);
    if (sent === `validation`) {
      res.status(400).json({ error: 'validation failed' });
    } else if (sent === `error`) {
      res.status(500).json({ error: `couldn't connect to email server` });
    }
    res.status(200).json({ success: `sent` });
  }
}

export default new MailerController();
