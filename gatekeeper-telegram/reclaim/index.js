const { scheduler } = require("./utils/scheduler");
// const kickScheduler = require("./utils/kick-scheduler");
const bot = require('../client/bot');
require('dotenv').config();


// const globalScheduler = async () => {
//     try {
//         // Get the list of chats the bot is part of
//         const updates = await bot.getUpdates();

//         const groupChats = updates
//             .filter(update => update.message && update.message.chat.type === 'group')
//             .map(update => update.message.chat);

//         if (groupChats.length === 0) {
//             console.log('The bot is not part of any groups.');
//             return;
//         }

//         const groupNames = groupChats.map(chat => chat.title || chat.username).join('\n');
//         console.log(`Groups:\n${groupNames}`);
//     } catch (error) {
//         console.error('An error occurred in global scheduler:', error);
//     }
// };

const globalScheduler = async (bot) => {
    try {
        console.log('Running the gloabl scheduler. Current date:', Date.now());
        await scheduler(bot).then(() => console.log('Scheduler finished.'));
        // await kickScheduler().then(() => console.log('Kick scheduler finished.'));
    } catch (error) {
        console.error('An error occurred:', error);
    }
    console.log('Global scheduler finished.');
};

module.exports = globalScheduler;