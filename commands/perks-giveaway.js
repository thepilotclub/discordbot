const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('perks-giveaway')
        .setDescription('Picks random user with company perks role(s)'),
    async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')) {
            interaction.guild.members.fetch().then(members => {
                let result = members.filter(m => m.roles.cache.find(role => role.id === process.env.VIP_ROLE || role.id === process.env.COMMUTER_ROLE
                    || role.id === process.env.FREQUENTFLIER_ROLE))
                let tags = result.map(m => m.user.toString());
                interaction.deferReply()
                setTimeout(function () {
                    interaction.editReply("And the winner is " + tags[Math.floor(Math.random() * tags.length)] + ". Congratulations!");
                }, 3000)
            })
        }
    },
};