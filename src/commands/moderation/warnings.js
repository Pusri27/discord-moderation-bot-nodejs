const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../utils/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnings')
        .setDescription('Displays warning history for a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to check')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const warningsPath = path.resolve(process.cwd(), config.warningStorage);

        let warnings = {};
        try {
            if (fs.existsSync(warningsPath)) {
                const data = fs.readFileSync(warningsPath, 'utf8');
                warnings = JSON.parse(data);
            }
        } catch (err) {
            console.error('Error reading warnings file:', err);
            return interaction.reply({ content: 'Error reading warning history.', ephemeral: true });
        }

        const userWarnings = warnings[user.id] || [];

        if (userWarnings.length === 0) {
            return interaction.reply({ content: `${user.tag} has no warnings.` });
        }

        const embed = new EmbedBuilder()
            .setTitle(`Warnings for ${user.tag}`)
            .setColor(0xFFA500)
            .setTimestamp();

        userWarnings.forEach((warn, index) => {
            embed.addFields({ name: `Warning ${index + 1}`, value: `**Reason:** ${warn.reason}\n**Date:** ${warn.date}` });
        });

        await interaction.reply({ embeds: [embed] });
    },
};
