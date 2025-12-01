const { Events } = require('discord.js');
const { logToChannel } = require('../utils/logger');

module.exports = {
    name: Events.MessageUpdate,
    async execute(oldMessage, newMessage) {
        if (oldMessage.partial || newMessage.partial) return;
        if (newMessage.author.bot) return;
        if (oldMessage.content === newMessage.content) return;

        await logToChannel(
            newMessage.client,
            'Message Edited',
            `**User:** ${newMessage.author.tag} (${newMessage.author.id})\n**Channel:** ${newMessage.channel}\n**Before:**\n${oldMessage.content}\n**After:**\n${newMessage.content}`,
            0xFFFF00
        );
    },
};
