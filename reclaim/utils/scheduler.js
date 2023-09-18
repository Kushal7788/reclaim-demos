const { Group } = require('../../models/Group');
const bot = require('../../client/bot');
const { User } = require('../../models/User');
const { sendReclaimUrl } = require('./send-reclaim-url');
require('dotenv').config();

const checkPartOfGroup = async (bot, groupId) => {
    try {
        const botInfo = await bot.getMe();
        const chatMember = await bot.getChatMember(groupId, botInfo.id);
        return (chatMember.status === 'administrator' || chatMember.status === 'creator');
    } catch (error) {
        console.error('An error occurred in checkPartOfGroup:', error);
        return false;
    }
};

const checkAdmin = async (bot, groupId, userId) => {
    try {
        const admins = await bot.getChatAdministrators(groupId);
        for (const admin of admins) {
            if (admin.user.id == userId) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('An error occurred in checkAdmin:', error);
        return false;
    }
};

const iterateMembers = async (groupId, groupTitle) => {
    try {
        const groupUsers = await User.find({ groupId: groupId });
        const groupConfig = await Group.findOne({ groupId: groupId, groupTitle: groupTitle });

        for (const user of groupUsers) {
            const isAdmin = await checkAdmin(bot, groupId, user.userId);
            if (!isAdmin) {
                const isVerified = user.data.isVerified;
                if (!isVerified) {
                    await sendReclaimUrl(bot, groupId, user.userId, user.data.userName, groupTitle, groupConfig?.data.provider);
                }
            }
        }
    } catch (error) {
        console.error('An error occurred in iterateMembers:', error);
    }
};

const scheduler = async (bot) => {
    try {
        const telegramGroups = await Group.find();
        for (const group of telegramGroups) {
            const groupId = group.groupId;
            const ifPartOfGroup = await checkPartOfGroup(bot, groupId);
            if (ifPartOfGroup && ((Date.now() - group.data.scheduledStartTime) > (group.data.scheduledTimer - 50000))) {
                group.data = {
                    ...group.data,
                    scheduledStartTime: Date.now()
                };
                await group.save();
                console.log(`Iterating members in ${group.groupTitle}...`);
                await iterateMembers(group.groupId, group.groupTitle);
            }
        }
    } catch (error) {
        console.error('An error occurred in scheduler:', error);
    }
    console.log('Scheduler finished.');
};

module.exports = { scheduler };