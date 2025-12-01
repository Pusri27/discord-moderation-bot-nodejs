const { Events } = require('discord.js');
const { logToChannel } = require('../utils/logger');

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        await logToChannel(
            member.client,
            'Member Left',
            `**User:** ${member.user.tag} (${member.id})\n**Joined At:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>`,
            0xFF0000
        );
    },
};
