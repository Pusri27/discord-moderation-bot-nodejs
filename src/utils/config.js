require('dotenv').config();

module.exports = {
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  logChannelId: process.env.LOG_CHANNEL_ID,
  autoRoleId: process.env.AUTO_ROLE_ID,
  warningStorage: './src/utils/warnings.json'
};
