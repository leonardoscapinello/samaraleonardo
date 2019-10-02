import Telegraf from 'telegraf';
import Telegram from 'telegraf/telegram';
import TelegramConf from '../../config/telegram';

const bot = new Telegraf(TelegramConf.token);
const telegram = new Telegram(TelegramConf.token, {
  agent: null, // https.Agent instance, allows custom proxy, certificate, keep alive, etc.
  webhookReply: true, // Reply via webhook
});

async function chatbot(context) {
  const ctx = context;
  let [replyMessage, message, first_name] = '';

  async function fetchContent() {
    message = ctx.message.text;
    first_name = ctx.message.first_name;
  }

  async function reply() {
    replyMessage = `Ola, ${message} - ${first_name}`;
  }

  await fetchContent();
  await reply();

  return replyMessage;
}

bot.use(async (ctx, next) => {
  const reply = await chatbot(ctx);
  ctx.reply(reply);
  await telegram.sendSticker(
    TelegramConf.chatId,
    `https://img.etimg.com/thumb/msid-68333505,width-643,imgsize-204154,resizemode-4/googlechrome.jpg`
  );
  next();
});

bot.launch();
