const { Telegraf } = require('telegraf');

const bot = new Telegraf('5782538644:AAGtoGqNxylfDq0afECJbbVVz076YjKZw7w')

bot.start((ctx) => ctx.reply('Welcome'));

const users = [];

function bubbleSort(arr) {
    for (let j = arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    return arr
}

function vstrechanie(usersM) {
    let result = {};
    usersM.forEach(function(a){
        if (result[a] !== undefined)
            ++result[a];
        else
            result[a] = 1;
    });
    let vivod = '';
    result = bubbleSort(result);
    for (let key in result) {
        vivod += `${key} - ${result[key]} сообщения(е)\n`;
    }
    return vivod
}

bot.hears('/getstat', (ctx) => {
    bot.telegram.sendMessage(
      ctx.chat.id,
      vstrechanie(users))
})
bot.on('message',  (ctx) => {
    users.push(ctx.message.from.username);
})


bot.launch()
