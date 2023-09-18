const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

module.exports = bot;