const ms = require('ms');
const config = require("../../config.json")

module.exports = {
    config: {
        name: "start",
        description: "Начинает розыгрыш",
        usage: "[channel] [duration] [winners] [prize]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    },
    run: async (client, message, args) => {
        if (config["Giveaway_Options"].giveawayManagerID) {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.id === config["Giveaway_Options"].giveawayManagerID)) {
                return message.channel.send(':boom: You need to have the \`MANAGE_MESSAGES\` permissions to start giveaways.');
            }
        } else {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
                return message.channel.send(':boom: You need to have the \`MANAGE_MESSAGES\` permissions to start giveaways.');
            }
        }

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.channel.send(':boom: Uh oh, I couldn\'t find that channel! Try again!');
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.channel.send(':boom: Hm. you haven\'t provided a duration. Can you try again?');
        }

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.channel.send(':boom: Uh... you haven\'t provided the amount of winners.');
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.channel.send(':boom: Oh, it seems like you didn\'t give me a valid prize!');
        }
        if (!config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            giveawayChannel.send(`<@&${config["Giveaway_Options"].giveawayRoleID}>`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **КОНКУРС** :tada:",
                    giveawayEnded: ":tada: **КОНКУРС ЗАВЕРШЕН** :tada:",
                    timeRemaining: "Осталось времени: **{duration}**!",
                    inviteToParticipate: "Поставь реакцию на 🎉 что бы участвовать!",
                    winMessage: "Поздравляем, {winners}! Вы выиграли **{prize}**!",
                    embedFooter: "Подарки",
                    noWinner: "Недостаточно участников для определения победителя!",
                    hostedBy: "Создан: {user}",
                    winners: "Победитель(и)",
                    endedAt: "Закончился в",
                    units: {
                        seconds: "секунд",
                        minutes: "минут",
                        hours: "часов",
                        days: "дней",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":tada: **КОНКУРС** :tada:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":tada: **КОНКУРС ЗАВЕРШЕН** :tada:",
                    timeRemaining: "Осталось времени: **{duration}**!",
                    inviteToParticipate: "Поставь реакцию на 🎉 что бы участвовать!",
                    winMessage: "Поздравляем, {winners}! Вы выиграли **{prize}**!",
                    embedFooter: "Подарки",
                    noWinner: "Недостаточно участников для определения победителя!",
                    hostedBy: "Создан: {user}",
                    winners: "Победитель(и)",
                    endedAt: "Закончился в",
                    units: {
                        seconds: "секунд",
                        minutes: "минут",
                        hours: "часов",
                        days: "дней",
                        pluralS: false
                    }
                }
            });

        } else if (!config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            giveawayChannel.send(`@everyone`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **КОНКУРС** :tada:",
                    giveawayEnded: ":tada: **КОНКУРС ЗАВЕРШЕН** :tada:",
                    timeRemaining: "Осталось времени: **{duration}**!",
                    inviteToParticipate: "Поставь реакцию на 🎉 что бы участвовать!",
                    winMessage: "Поздравляем, {winners}! Вы выиграли **{prize}**!",
                    embedFooter: "Подарки",
                    noWinner: "Недостаточно участников для определения победителя!",
                    hostedBy: "Создан: {user}",
                    winners: "Победитель(и)",
                    endedAt: "Закончился в",
                    units: {
                        seconds: "секунд",
                        minutes: "минут",
                        hours: "часов",
                        days: "дней",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":tada: **КОНКУРС** :tada:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":tada: **КОНКУРС ЗАВЕРШЕН** :tada:",
                    timeRemaining: "Осталось времени: **{duration}**!",
                    inviteToParticipate: "Поставь реакцию на 🎉 что бы участвовать!",
                    winMessage: "Поздравляем, {winners}! Вы выиграли **{prize}**!",
                    embedFooter: "Подарки",
                    noWinner: "Недостаточно участников для определения победителя!",
                    hostedBy: "Создан: {user}",
                    winners: "Победитель(и)",
                    endedAt: "Закончился в",
                    units: {
                        seconds: "секунд",
                        minutes: "минут",
                        hours: "часов",
                        days: "дней",
                        pluralS: false
                    }
                }
            });
        } else if (!config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **КОНКУРС** :tada:",
                    giveawayEnded: ":tada: **КОНКУРС ЗАВЕРШЕН** :tada:",
                    timeRemaining: "Осталось времени: **{duration}**!",
                    inviteToParticipate: "Поставь реакцию на 🎉 что бы участвовать!",
                    winMessage: "Поздравляем, {winners}! Вы выиграли **{prize}**!",
                    embedFooter: "Подарки",
                    noWinner: "Недостаточно участников для определения победителя!",
                    hostedBy: "Создан: {user}",
                    winners: "Победитель(и)",
                    endedAt: "Закончился в",
                    units: {
                        seconds: "секунд",
                        minutes: "минут",
                        hours: "часов",
                        days: "дней",
                        pluralS: false
                    }
                }
            });
        }


        message.channel.send(`:tada: Конкурс! Розыгрыш приза \`${giveawayPrize}\` только здесь в ${giveawayChannel}!`);
    }
}
