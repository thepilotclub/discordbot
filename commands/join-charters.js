const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents, Interaction } = require('discord.js');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('join-charters')
        .setDescription('Use this commnad to request an aircraft for use in OnAir.'
        ).addStringOption(option =>
            option.setName('airline-code').setDescription('What is the code to your Airline in OnAir?').setRequired(true)
        ).addStringOption(option=>
            option.setName('home-base').setDescription('Where is the airport that you have started your company?').setRequired(true)
        ).addStringOption(option=>
            option.setName('aircraft-type').setDescription('What is the aircraft type you would like?').setRequired(true)
        ).addStringOption(option=>
            option.setName('seating-config').setDescription('What is the prefered seating configuration you would like?').setRequired(true)
        ),
	async execute(interaction,client) {
        const channel = interaction.guild.client.channels.cache.get('979566039757103119')
        const airline = interaction.options.getString('airline-code')
        const type = interaction.options.getString('aircraft-type')
        const seating = interaction.options.getString('seating-config')
        const home = interaction.options.getString('home-base')
        const embed = new MessageEmbed()
            .setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.displayAvatarURL()}`})
            .setTitle('New Join Request')
            .setDescription( 'A member of TPC has reqested to join TPC Charters.')
            .setColor('0X37B6FF')
            .addFields({name:'Member Details', value: `**TPC Charters User:** ${interaction.user} \n  **Airline Code:** ${airline} \n **Home Base:** ${home} \n **Aircraft Type (For Assignment):** ${type} \n **Seating Configuration:** ${seating}`})
            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
        if (interaction.member.roles.cache.some(role => role.name === 'Pilots')){
            channel.send({content: `<@&910012872246046730>` , embeds: [embed]})
            await interaction.reply({content:`You have requested a ${type} for ${airline}. A Charters Manager will assign the aircraft as soon as they can. If you do not have the aircraft assigned within 12 hours, please try this command again.`, ephemeral: true})
        } else {
            interaction.reply({content:`If you are seeing this, ping a member of staff to give you the Pilots Role`, ephemeral: true})
        }
    }
}