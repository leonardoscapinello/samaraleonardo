import Telegraf from 'telegraf';
import TelegramConf from '../../../config/telegram';
import robotText from './text';

// import Telegram from 'telegraf/telegram';
// import { resolve } from 'any-promise';

const bot = new Telegraf(TelegramConf.token);

async function robot(context) {
  let message = '';
  async function getMessages(ctx) {
    console.log(`${ctx.message.from.first_name} sent: ${ctx.message.text}`);
    message = ctx.message.text;
  }
  async function messageToKeywords() {
    return new Promise(resolve => {
      const keywords = robotText(message);
      resolve(keywords);
    });
  }
  await getMessages(context);
  await messageToKeywords();
}

bot.start(ctx =>
  ctx.replyWithHTML(
    `Olá ${ctx.message.from.first_name}, seja bem-vindo ao Assistente Virtual do Portal Financeiro <b>Samara & Leonardo</b> 💲❤️. \n\nEstou aqui para te ajudar com algumas informações rápidas, como por exemplo: \n\n<b>Você pode consultar: </b>\n\t\t• Saldos em Objetivos;\n\t\t• Saldos em Conta Corrente;\n\t\t• Consumo de Cartão de Crédito;`
  )
);

bot.use(ctx => {
  robot(ctx);
});

bot.launch();

module.exports = robot;
