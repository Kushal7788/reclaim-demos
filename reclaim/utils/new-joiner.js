const { User } = require('../../models/User');
const { Group } = require('../../models/Group');
const { sendReclaimUrl } = require('./send-reclaim-url');

const createNewUser = async (groupId, userId, username) => {
    try {
        const newUser = new User();
        newUser.userId = userId;
        newUser.groupId = groupId;
        newUser.data = {
            isVerified: false,
            startTime: Date.now(),
            userName: username,
        };
        await newUser.save();
        return;
    } catch (err) {
        console.log(`err: ${err}`);
    }
};

const newJoiner = async (bot, message) => {
    // Send a welcome message to the user in the general channel
    const chatId = message.chat.id;
    const userId = message.new_chat_member.id;
    const username = message.new_chat_member.first_name;

    console.log(`User ${username} has joined the server.`);
    const groupConfig = await Group.findOne({ groupId: chatId });
    if (groupConfig) {
        const userConfig = await User.findOne({ userId: userId, groupId: chatId });
        if (userConfig) {
            userConfig.data = {
                ...userConfig.data,
                isVerified: false,
            };
            await userConfig.save();
            return;
        };
        await createNewUser(chatId, userId, username);
        return await sendReclaimUrl(bot, chatId, userId, username, message.chat.title, groupConfig.data.provider);
    }
};

module.exports = { newJoiner };