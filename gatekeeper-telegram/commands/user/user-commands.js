const { Group } = require('../../models/Group');
const { User } = require('../../models/User');
const QRCode = require('qrcode');
const { sendReclaimUrl } = require('../../reclaim/utils/send-reclaim-url');
const sendMessage = require('../../reclaim/utils/send-msg');


const userCommands = async (bot) => {

    // user

    // bot.onText(/\/verify/, async (msg) => {
    //     const chatId = msg.chat.id;
    //     const userId = msg.from.id;


    //     if (msg.from.is_bot) {
    //         await sendMessage(bot, userId, 'Bots are not allowed to use this command.');
    //         return;
    //     }

    //     const groupConfig = await Group.findOne({ groupId: chatId });
    //     if (!groupConfig) {
    //         await sendMessage(bot, userId, 'Group not configured. Ask Admins to Configure the BOT for this Group.');
    //         return;
    //     }

    //     const ifUserConfig = await User.findOne({ userId: userId, groupId: chatId });
    //     if (!ifUserConfig) {
    //         const newUser = new User();
    //         newUser.userId = userId;
    //         newUser.groupId = chatId;
    //         newUser.data = {
    //             isVerified: false,
    //             userName: msg.from.first_name,
    //             startTime: Date.now(),
    //         }
    //         await newUser.save();
    //     }

    //     const userConfig = await User.findOne({ userId: userId, groupId: chatId });
    //     if (userConfig.data.isVerified) {
    //         await sendMessage(bot, userId, `You are already verified in the "${msg.chat.title}" group.`);
    //         return;
    //     }

    //     await sendReclaimUrl(bot, msg, groupConfig.data.provider);
    // });

    bot.onText(/\/help/, async (msg) => {
        const userId = msg.from.id;
        console.log(userId, typeof userId);

        await sendMessage(bot, userId, 'Available commands for GateKeeper Bot:\n/setup - Add Token to setup the bot\n');
    });




};

module.exports = userCommands;
