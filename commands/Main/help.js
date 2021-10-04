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
        'https://discord.gg/KjZ5PUM'
      )
      .setThumbnail(client.user.displayAvatarURL({ ...avatarOptions }))
      .setTitle('Help')
      .setURL('https://discord.gg/KjZ5PUM')
      .setColor('7289da')
      .setDescription(`Заходите к нам в гости \n[ссылка!](https://discord.gg/KjZ5PUM)`)
      .addFields({
        name: `🎉 ${config["Bot_Info"].prefix}старт [канал] [время] [числопобедителей] [приз]`,
        value: [
          'Канал должен быть виден боту.',
          'Продолжительность конкурса указывается числом', 
          'и временной переменной например 5m 2h - это 5 минут, 2 часа.',
          'Указать число победителей от 1 и выше.',
          'Написать что за приз, кроме пустого варианта.'
        ].join('\n')
      }, {
        name: '👥 Пример:',
        value: [
          `⌨️ ${config["Bot_Info"].prefix}старт #general 10m 1 ПЯТЬ ЛЯМ МОНЕТ`,
          `➡️ Создает на \`10 minute\` конкурс на \`1\` победителя`,
          `с призом \`ПЯТЬ ЛЯМ МОНЕТ\` на канале \`#general\`.`
        ].join('\n')
      }, {
        name: `❌ ${config["Bot_Info"].prefix}end [ид-сообщения]`,
        value: 'Message-ID написать **ID** сообщения конкурса.'
      }, {
        name: '👥 Пример:',
        value: `⌨️ ${config["Bot_Info"].prefix}end 892678258946659587\n➡️ Завершает розыгрыш сообщением-ID \`892678258946659587\`.`
      }, {
        name: `🔍 ${config["Bot_Info"].prefix}reroll [ид-сообщения]`,
        value: 'Message-ID написать **ID** сообщения конкурса.'
      }, {
        name: '👥 Пример:',
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
