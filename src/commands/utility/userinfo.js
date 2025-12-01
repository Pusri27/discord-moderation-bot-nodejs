const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get info about')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        const embed = new EmbedBuilder()
            .setTitle(`${user.tag} Info`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setColor(member ? member.displayHexColor : 0x0099FF)
            .addFields(
                { name: 'User ID', value: user.id, inline: true },
                { name: 'Joined Discord', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: 'Joined Server', value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` : 'Not in server', inline: true }
            );

        if (member) {
            const roles = member.roles.cache
                .filter(r => r.name !== '@everyone')
                .map(r => r.toString())
                .join(', ') || 'None';

            embed.addFields({ name: 'Roles', value: roles.length > 1024 ? 'Too many roles to list' : roles });
        }

        await interaction.reply({ embeds: [embed] });
    },
};
