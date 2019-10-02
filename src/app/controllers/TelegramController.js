import TelegramApi from '../services/telegram';

class TelegramController {
  async store(req, res) {
    await TelegramApi.sendmessage().then(response => {
      res.status(200).json({ success: response });
    });
  }
}

export default new TelegramController();
