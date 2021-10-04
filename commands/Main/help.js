const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")
module.exports = {
  config: {
    name: "help",
    description: "Получить список команд бота.",
    usage: "help",
    category: "Main",
    accessableby: "Everyone",
    aliases: [], // Чтобы добавить собственные псевдонимы, просто введите ["alias1", "alias2"].
  },
  run: async (client, message, args) => {
    let avatarOptions = {
      format: 'png',
      dynamic: true,
      size: 1024
    }

    const embed = new MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ ...avatarOptions }),
        'https://github.com/ofigennaya2018/discord-giveaway-bot'
      )
      .setThumbnail(client.user.displayAvatarURL({ ...avatarOptions }))
      .setTitle('Help')
      .setURL('https://github.com/ofigennaya2018/discord-giveaway-bot')
      .setColor('7289da')
      .setDescription(`Хотите сами создать бесплатного бота?\n[Посетите мою страницу в Github!](https://github.com/ofigennaya2018/discord-giveaway-bot)`)
      .addFields({
        name: `🎉 ${config["Bot_Info"].prefix}start [channel] [duration] [winners] [prize]`,
        value: [
          'Канал должен быть виден раздачному боту.',
          'Продолжительность указывается числом и временной переменной.',
          'Победители указываются положительным числом.',
          'Приз может быть любым, кроме пустого.'
        ].join('\n')
      }, {
        name: '👥 Example:',
        value: [
          `⌨️ ${config["Bot_Info"].prefix}start #general 10m 1 $9.99 Nitro`,
          `➡️ Создает на \`10 minute\` конкурс на \`1\` победителя с призом`,
          `\`МОНЕТЫ\` на канале \`#general\`.`
        ].join('\n')
      }, {
        name: `❌ ${config["Bot_Info"].prefix}end [message-id]`,
        value: 'Message-ID has to be the **ID** of the giveaway message.\n**Not the link!**'
      }, {
        name: '👥 Example:',
        value: `⌨️ ${config["Bot_Info"].prefix}end 892678258946659587\n➡️ Завершает розыгрыш сообщением-ID \`892678258946659587\`.`
      }, {
        name: `🔍 ${config["Bot_Info"].prefix}reroll [message-id]`,
        value: 'Message-ID has to be the **ID** of the giveaway message.\n**Not the link!**'
      }, {
        name: '👥 Example:',
        value: `⌨️ ${config["Bot_Info"].prefix}reroll 892678258946659587\n➡️ Выбирает новых победителей розыгрыша с сообщением-ID \`892678258946659587\`.`
      })
      .setFooter('Перевод by SELESTA', client.user.displayAvatarURL({ ...avatarOptions }))

    if (message.guild) {
      message.channel.send('Проверьте свои личные сообщения!');
      message.delete();
      message.author.send(embed);
    } else {
      message.author.send(embed)
    }
  },
};
