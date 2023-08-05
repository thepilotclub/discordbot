const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('next-flight')
    .setDescription('The link to find out our next flight!'),
  async execute(interaction) {
    interaction.deferReply();
    const events = await interaction.guild.scheduledEvents.fetch();
    const sortedEvents = events.sort((a, b) => a.scheduledStartAt - b.scheduledStartAt);
    const event = sortedEvents.first();

    if (event === undefined) {
      interaction.reply('No events :(')
    } else {
      let eventTime = Date.parse(event.scheduledStartAt) / 1000;
      let timestamp = `<t:${eventTime}:F>`;
      const embed = new EmbedBuilder()
        .setAuthor({ name: `${event.name ? event.name : 'Not included'}` })
        .setDescription(`${event.description ? event.description : 'Not Included'}`)
        .addFields({ name: 'Event Start Time:', value: `${timestamp}` }, {
          name: 'Voice Channel:',
          value: event.channelId ? `<#${event.channelId}>` : 'Not Included',
        })
        .setColor('#37B6FF')
        .setImage(event.coverImageURL({ size: 4096 }))
        .setTimestamp()

        .setFooter({
          text: "Made by TPC Dev Team",
          iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`
        })
        .setTimestamp()
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel("More TPC Group Flights")
            .setURL("https://thepilotclub.org/dispatch")
            .setStyle(ButtonStyle.Link),
        );
      await interaction.followUp({ content: `Next TPC Group Flight:`, embeds: [embed], components: [row] })
    }
  }
};
