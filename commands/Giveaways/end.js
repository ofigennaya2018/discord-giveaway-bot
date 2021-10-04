module.exports = {
    config: {
        name: "end",
        description: "Завершает розыгрыш.",
        usage: "[message-id]",
        category: "Подарки",
        accessableby: "Админы",
        aliases: [], // Чтобы добавить собственные псевдонимы, просто введите ["alias1", "alias2"].
    },
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':boom: Вам нужно иметь \`MANAGE_MESSAGES\` разрешения на прекращение розыгрышей.');
        }

        if (!args[0]) {
            return message.channel.send(':boom: Ой, я не могу найти это сообщение! Попробуйте снова!');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(':boom: Хм. Я не могу подарить `' + args.join(' ') + '`.');
        }
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            .then(() => {
                message.channel.send('Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds...');
            })
            .catch((e) => {
                if (e.startsWith(`Розыгрыш с идентификатором сообщения ${giveaway.messageID} уже закончился.`)) {

                    message.channel.send('Эта раздача уже закончилась!');

                } else {
                    console.error(e);
                    message.channel.send('Эта раздача уже закончилась...');
                }
            });
    },
}
