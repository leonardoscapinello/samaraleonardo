/*
import Telegraf from 'telegraf';

import Router from 'telegraf/router';
import Extra from 'telegraf/extra';
import session from 'telegraf/session';
import TelegramConf from '../../../config/telegram';

const bot = new Telegraf(TelegramConf.recipient);

const markup = Extra.HTML().markup(m =>
  m.inlineKeyboard(
    [
      m.callbackButton('+ R$ 0,05', 'add:0.05'),
      m.callbackButton('+ R$ 0,25', 'add:0.25'),
      m.callbackButton('+ R$ 1,00', 'add:1'),
      m.callbackButton('+ R$ 5,00', 'add:5'),
      m.callbackButton('+ R$ 20,00', 'add:20'),
      m.callbackButton('+ R$ 50,00', 'add:50'),
      m.callbackButton('- R$ 0,05', 'sub:0.05'),
      m.callbackButton('- R$ 0,25', 'sub:0.25'),
      m.callbackButton('- R$ 1,00', 'sub:1'),
      m.callbackButton('- R$ 5,00', 'sub:5'),
      m.callbackButton('- R$ 20,00', 'sub:20'),
      m.callbackButton('- R$ 50,00', 'sub:50'),
      m.callbackButton('Clear', 'clear'),
    ],
    { columns: 3 }
  )
);

const calculator = new Router(({ callbackQuery }) => {
  if (!callbackQuery.data) {
    return;
  }
  const parts = callbackQuery.data.split(':');
  return {
    route: parts[0],
    state: {
      amount: parseInt(parts[1], 10) || 0,
    },
  };
});

calculator.on('add', ctx => {
  ctx.session.value = (ctx.session.value || 0) + ctx.state.amount;
  return editText(ctx);
});

calculator.on('sub', ctx => {
  ctx.session.value = (ctx.session.value || 0) - ctx.state.amount;
  return editText(ctx);
});

calculator.on('clear', ctx => {
  ctx.session.value = 0;
  return editText(ctx);
});

calculator.otherwise(ctx => ctx.reply('🌯'));

function editText(ctx) {
  if (ctx.session.value === 42) {
    return ctx
      .answerCbQuery(
        'Answer to the Ultimate Question of Life, the Universe, and Everything',
        true
      )
      .then(() => ctx.editMessageText('🎆'));
  }
  return ctx
    .editMessageText(`Value: <b>${ctx.session.value}</b>`, markup)
    .catch(() => undefined);
}

bot.use(session({ ttl: 10 }));
bot.start(ctx => {
  ctx.session.value = 0;
  return ctx.reply(`Value: <b>${ctx.session.value}</b>`, markup);
});
bot.on('callback_query', calculator);
*/
