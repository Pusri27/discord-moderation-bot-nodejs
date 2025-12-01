const { Events } = require('discord.js');
const { logToChannel } = require('../utils/logger');

module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        if (message.partial) return; // Cannot fetch content of partial messages
        if (message.author.bot) return;

        await logToChannel(
            message.client,
            'Message Deleted',
            `**User:** ${message.author.tag} (${message.author.id})\n**Channel:** ${message.channel}\n**Content:**\n${message.content}`,
            0xFFA500
        );
    },
};
