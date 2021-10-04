const ms = require('ms');
const config = require("../../config.json")
module.exports = {
    config: {
        name: "reroll",
        description: "Повторяет раздачу.",
        usage: "[message-id]",
        category: "Подарки",
        accessableby: "Админы",
        aliases: [], // Чтобы добавить собственные псевдонимы, просто введите ["alias1", "alias2"].
    },
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':boom: Вам нужно иметь \`MANAGE_MESSAGES\` разрешение на повторный розыгрыш призов..');
        }

        if (!args[0]) {
            return message.channel.send(':boom: Ой, я не могу найти это сообщение! Попробуйте снова!');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(':boom: Хм. Я не могу найти раздачу за `' + args.join(' ') + '`.');
        }

        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send('Розыгрыш разыгрался повторно'!');
            })
            .catch((e) => {
                if (e.startsWith(`Розыгрыш с идентификатором сообщения ${giveaway.messageID} не закончился.`)) {
                    message.channel.send('Этот конкурс не закончился!');
                } else {
                    console.error(e);
                    message.channel.send('Произошла ошибка...');
                }
            });
    },
}

