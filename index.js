const { Telegraf } = require('telegraf');

require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Hello!'));

const usersMessage = [];

function messageCounterByUser(users) {
    let result = {};
    let message = '';

    users.forEach((a) => {
        if (result[a] !== undefined) {
            ++result[a];
        }
        else {
            result[a] = 1;
        }
    });

    const sortable = Object.entries(result)
      .sort(([,a],[,b]) => b-a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    console.log(sortable);

    for (let key in sortable) {
        message += `${key} - ${result[key]} сообщения(е)\n`;
    }
    return message;
}

bot.hears('/getstat', (ctx) => {
    bot.telegram.sendMessage(
      ctx.chat.id,
      messageCounterByUser(usersMessage));
})

bot.on('message',  (ctx) => {
    usersMessage.push(ctx.message.from.username);
})

bot.launch();
