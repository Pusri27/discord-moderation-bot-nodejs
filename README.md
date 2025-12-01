# 🚀 Discord Moderation & Utility Bot (Node.js + discord.js v14)

A fully-featured Discord moderation and utility bot built with **Node.js** and **discord.js v14**.  
This bot includes essential moderation tools, a complete logging system, automatic role assignment, and multiple utility commands — all structured using clean, modular code.  
Ideal for community servers, moderation teams, or as a strong portfolio project for showcasing backend and automation skills.

---

# ✨ Features

## 🔧 Moderation Commands
- **/kick @user [reason]** — Removes a user from the server  
- **/ban @user [reason]** — Bans a user and logs the action  
- **/timeout @user [duration] [reason]** — Temporary mute (supports `10m`, `1h`, `24h`, etc.)  
- **/warn @user [reason]** — Issues a warning and stores it in `warnings.json`  
- **/warnings @user** — Displays all warnings for a user  

---

## 📜 Logging System
The bot automatically logs important events to a dedicated log channel:

- Member join  
- Member leave  
- Message deleted  
- Message edited  
- Kick & ban actions  

Each log includes useful context such as username, timestamp, and event details.

---

## 🧰 Utility Commands
- **/ping** — Check bot latency  
- **/userinfo @user** — View detailed information about a user  
- **/serverinfo** — View server statistics  
- **Auto-role** — Assigns a predefined role to new members automatically  

---

# 🛠 Tech Stack
- **Node.js** (LTS recommended)  
- **discord.js v14**  
- **dotenv** for environment variables  
- Slash command registration system  
- Modular command & event architecture  

---

# 📂 Folder Structure

```
discord-moderation-bot-nodejs/
│
├── src/
│   ├── commands/
│   │   ├── moderation/
│   │   │   ├── ban.js
│   │   │   ├── kick.js
│   │   │   ├── timeout.js
│   │   │   └── warn.js
│   │   ├── utility/
│   │   │   ├── ping.js
│   │   │   ├── serverinfo.js
│   │   │   └── userinfo.js
│   ├── events/
│   │   ├── guildMemberAdd.js
│   │   ├── guildMemberRemove.js
│   │   ├── messageDelete.js
│   │   └── messageUpdate.js
│   ├── utils/
│   │   ├── logger.js
│   │   ├── warnings.json
│   │   └── config.js
│   └── index.js
│
├── deploy-commands.js
├── .env.example
├── package.json
└── README.md
```

---

# 🔧 Setup Instructions

## 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/discord-moderation-bot-nodejs
cd discord-moderation-bot-nodejs
```

## 2️⃣ Install dependencies
```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the project root.  
Use `.env.example` as your template.

```
TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
GUILD_ID=YOUR_GUILD_ID
LOG_CHANNEL_ID=YOUR_LOG_CHANNEL_ID
AUTO_ROLE_ID=YOUR_AUTO_ROLE_ID
```

### How to find these values:
- **TOKEN** → Discord Developer Portal → Bot → Reset Token  
- **CLIENT_ID** → Application ID  
- **GUILD_ID** → Right-click your server → Copy Server ID  
- **LOG_CHANNEL_ID** → Right-click your logs channel → Copy ID  
- **AUTO_ROLE_ID** → Right-click your desired auto-role → Copy ID  

⚠️ **Never upload your `.env` file to GitHub — use `.env.example` instead.**

---

# 📝 Deploy Slash Commands
Before running the bot, register all slash commands:

```bash
node deploy-commands.js
```

You should see:
```
Successfully reloaded application (/) commands.
```

---

# ▶️ Start the Bot
```bash
node src/index.js
```

If successful:
```
Bot is now online!
```

The bot will appear online in your Discord server.

---

# 🎮 Usage Examples

### Kick a user
```
/kick @username Spamming the chat
```

### Ban a user
```
/ban @username Rule violation
```

### Timeout a user
```
/timeout @username 15m Being disruptive
```

### Warn a user
```
/warn @username Posting unnecessary links
```

### View user warnings
```
/warnings @username
```

### Utility commands
```
/ping
/serverinfo
/userinfo @username
```

---

# 🧠 Why This Project Is Useful
This bot demonstrates real-world skills:

- Moderation workflow automation  
- Slash command development  
- Event-driven programming  
- JSON data storage  
- Logging & audit tracking  
- Clean modular structure  
- Permission handling  
- Server automation (auto-role, logging, etc.)  

Perfect for use as a **portfolio project** when applying for developer jobs or freelance clients.

---

# 📄 License
MIT License — free to use, modify, and distribute.

---

# 🤝 Contributions
Pull requests are welcome!  
Feel free to fork the project and extend the bot with more advanced features.
