const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { logToChannel } = require('../../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the kick'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
        }

        if (!member.kickable) {
            return interaction.reply({ content: 'I cannot kick this user. They might have higher permissions.', ephemeral: true });
        }

        try {
            await member.kick(reason);
            await interaction.reply({ content: `Successfully kicked ${user.tag} for: ${reason}` });

            await logToChannel(interaction.client, 'Member Kicked', `**User:** ${user.tag} (${user.id})\n**Moderator:** ${interaction.user.tag}\n**Reason:** ${reason}`, 0xFFA500);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error trying to kick this user.', ephemeral: true });
        }
    },
};
