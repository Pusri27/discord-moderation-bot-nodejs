const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { logToChannel } = require('../../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeouts a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to timeout')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Duration (e.g., 10m, 1h, 24h)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the timeout'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const durationStr = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return interaction.reply({ content: 'User not found.', ephemeral: true });
        }

        if (!member.moderatable) {
            return interaction.reply({ content: 'I cannot timeout this user.', ephemeral: true });
        }

        let durationMs = 0;
        const unit = durationStr.slice(-1);
        const value = parseInt(durationStr.slice(0, -1));

        if (isNaN(value)) {
            return interaction.reply({ content: 'Invalid duration format. Use 10m, 1h, etc.', ephemeral: true });
        }

        switch (unit) {
            case 'm': durationMs = value * 60 * 1000; break;
            case 'h': durationMs = value * 60 * 60 * 1000; break;
            case 'd': durationMs = value * 24 * 60 * 60 * 1000; break;
            default: return interaction.reply({ content: 'Invalid time unit. Use m, h, or d.', ephemeral: true });
        }

        if (durationMs > 28 * 24 * 60 * 60 * 1000) {
            return interaction.reply({ content: 'Duration cannot exceed 28 days.', ephemeral: true });
        }

        try {
            await member.timeout(durationMs, reason);
            await interaction.reply({ content: `Timed out ${user.tag} for ${durationStr}. Reason: ${reason}` });

            await logToChannel(interaction.client, 'Member Timed Out', `**User:** ${user.tag} (${user.id})\n**Moderator:** ${interaction.user.tag}\n**Duration:** ${durationStr}\n**Reason:** ${reason}`, 0xFFFF00);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Failed to timeout user.', ephemeral: true });
        }
    },
};
