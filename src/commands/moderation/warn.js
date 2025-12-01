const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../utils/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to warn')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the warning')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const warningsPath = path.resolve(process.cwd(), config.warningStorage);

        let warnings = {};
        try {
            if (fs.existsSync(warningsPath)) {
                const data = fs.readFileSync(warningsPath, 'utf8');
                warnings = JSON.parse(data);
            }
        } catch (err) {
            console.error('Error reading warnings file:', err);
        }

        if (!warnings[user.id]) {
            warnings[user.id] = [];
        }

        const warningData = {
            reason: reason,
            date: new Date().toISOString().split('T')[0]
        };

        warnings[user.id].push(warningData);

        try {
            fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));
            await interaction.reply({ content: `Warned ${user.tag} for: ${reason}` });
        } catch (err) {
            console.error('Error writing warnings file:', err);
            await interaction.reply({ content: 'Failed to save warning.', ephemeral: true });
        }
    },
};
