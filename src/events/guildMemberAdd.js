const { Events } = require('discord.js');
const config = require('../utils/config');
const { logToChannel } = require('../utils/logger');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        // Auto Role
        if (config.autoRoleId) {
            try {
                const role = await member.guild.roles.fetch(config.autoRoleId);
                if (role) {
                    await member.roles.add(role);
                } else {
                    console.error('Auto role not found');
                }
            } catch (error) {
                console.error('Error assigning auto role:', error);
            }
        }

        // Log
        await logToChannel(
            member.client,
            'Member Joined',
            `**User:** ${member.user.tag} (${member.id})\n**Account Created:** <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`,
            0x00FF00
        );
    },
};
