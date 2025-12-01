const { EmbedBuilder } = require('discord.js');
const config = require('./config');

const logToChannel = async (client, title, description, color = 0x00FF00, fields = []) => {
    try {
        const channel = await client.channels.fetch(config.logChannelId);
        if (!channel) return console.error('Log channel not found');

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp()
            .addFields(fields);

        await channel.send({ embeds: [embed] });
    } catch (error) {
        console.error('Error sending log:', error);
    }
};

module.exports = { logToChannel };
