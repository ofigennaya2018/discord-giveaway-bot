const ms = require('ms');
const config = require("../../config.json")

module.exports = {
    config: {
        name: "старт",
        description: "Начинает розыгрыш",
        usage: "[channel] [duration] [winners] [prize]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // Чтобы добавить собственные псевдонимы, просто введите ["alias1", "alias2"].
    },
    run: async (client, message, args) => {
        if (config["Giveaway_Options"].giveawayManagerID) {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.id === config["Giveaway_Options"].giveawayManagerID)) {
                return message.channel.send(':boom: Вам нужно иметь \`MANAGE_MESSAGES\` разрешения на раздачу подарков.');
            }
        } else {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaway")) {
                return message.channel.send(':boom: Вам нужно иметь \`MANAGE_MESSAGES\` разрешения на раздачу подарков.');
            }
        }

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.channel.send(':boom: Ой, я не смог найти этот канал! Попробуйте снова!');
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.channel.send(':boom: Хм. вы не указали продолжительность. Вы можете попробовать еще раз?');
        }

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.channel.send(':boom: Эээ ... вы не указали количество победителей.');
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.channel.send(':boom: О, похоже, ты не дал мне действительного приза!');
        }
        if (!config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            giveawayChannel.send(`<@&${config["Giveaway_Options"].giveawayRoleID}>`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":gem: **КОНКУРС** :gem:",
                    giveawayEnded: ":gem: **КОНКУРС ЗАВЕРШЕН** :gem:",
                    timeRemaining: "Осталось времени: **{duration}**!",
                    inviteToParticipate: "Поставь реакцию на 💎 что бы участвовать!",
                    winMessage: "Поздравляем, {winners}! Вы выиграли **{prize}**!",
                    embedFooter: "Подарки",
                    noWinner: "Недостаточно участников для определения победителя!",
                    hostedBy: "Создан: {user}",
                    winners: "Победитель(ля)",
                    endedAt: "Закончился",
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
                    giveaway: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":gem: **КОНКУРС** :gem:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":gem: **КОНКУРС ЗАВЕРШЕН** :gem:",
                    timeRemaining: "Осталось времени: **{duration}**!",
                    inviteToParticipate: "Поставь реакцию на 💎 что бы участвовать!",
                    winMessage: "Поздравляем, {winners}! Вы выиграли **{prize}**!",
                    embedFooter: "Подарки",
                    noWinner: "Недостаточно участников для определения победителя!",
                    hostedBy: "Создан: {user}",
                    winners: "Победитель(и)",
                    endedAt: "Закончился",
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
                    giveaway: ":gem: **КОНКУРС** :gem:",
                    giveawayEnded: ":gem: **КОНКУРС ЗАВЕРШЕН** :gem:",
                    timeRemaining: "Осталось времени: **{duration}**!",
                    inviteToParticipate: "Поставь реакцию на 💎 что бы участвовать!",
                    winMessage: "Поздравляем, {winners}! Вы выиграли **{prize}**!",
                    embedFooter: "Подарки",
                    noWinner: "Недостаточно участников для определения победителя!",
                    hostedBy: "Создан: {user}",
                    winners: "Победитель(и)",
                    endedAt: "Закончился",
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
                    giveaway: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":gem: **КОНКУРС** :gem:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":gem: **КОНКУРС ЗАВЕРШЕН** :gem:",
                    timeRemaining: "Осталось времени: **{duration}**!",
                    inviteToParticipate: "Поставь реакцию на 💎 что бы участвовать!",
                    winMessage: "Поздравляем, {winners}! Вы выиграли **{prize}**!",
                    embedFooter: "Подарки",
                    noWinner: "Недостаточно участников для определения победителя!",
                    hostedBy: "Создан: {user}",
                    winners: "Победитель(и)",
                    endedAt: "Закончился",
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
                    giveaway: ":gem: **КОНКУРС** :gem:",
                    giveawayEnded: ":gem: **КОНКУРС ЗАВЕРШЕН** :gem:",
                    timeRemaining: "Осталось времени: **{duration}**!",
                    inviteToParticipate: "Поставь реакцию на 💎 что бы участвовать!",
                    winMessage: "Поздравляем, {winners}! Вы выиграли **{prize}**!",
                    embedFooter: "Подарки",
                    noWinner: "Недостаточно участников для определения победителя!",
                    hostedBy: "Создан: {user}",
                    winners: "Победитель(и)",
                    endedAt: "Закончился",
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


        message.channel.send(`:gem: Конкурс! Розыгрыш приза \`${giveawayPrize}\` только здесь в ${giveawayChannel}!`);
    }
}
