const sendEphemeral = require('../../reclaim/utils/send-ephemeral');
const { Token } = require('../../models/Token');
const { getInviteLink } = require('../../reclaim/utils/get-invite-link');


const checkAdmin = async (bot, chatId, userId) => {
    try {
        const chatMember = await bot.getChatMember(chatId, userId);
        return chatMember.status === 'creator' || chatMember.status === 'administrator' || chatMember.status === 'owner';
    } catch (error) {
        console.error('An error occurred:', error);
        return false;
    }
};

const adminCommands = async (bot) => {

    // admin

    bot.onText(/\/setup (.+)/, async (msg, match) => {
        try {
            const chatId = msg.chat.id;
            const userId = msg.from.id;
            const tokenValue = match[1];

            if (msg.from.is_bot) {
                await sendEphemeral(bot, chatId, 'Bots are not allowed to use this command.');
                return;
            }

            const isAdmin = await checkAdmin(bot, chatId, userId);
            if (!isAdmin) {
                await sendEphemeral(bot, chatId, 'Only admins can use this command.');
                return;
            }
            const token = await Token.findOne({ token: tokenValue });
            if (!token || token.data.messenger !== 'telegram') {
                await sendEphemeral(bot, chatId, 'Invalid token.');
                return;
            }

            if (Date.now() - token.createTime > 60 * 10 * 1000) {
                await sendEphemeral(bot, chatId, 'Token expired.');
                return;
            }

            token.data = {
                ...token.data,
                verified: true,
                groupId: chatId,
                groupTitle: msg.chat.title,
            };
            await token.save();
            await sendEphemeral(bot, chatId, 'Token Verified successfully.');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });

    bot.onText(/\/invite-link/, async (msg, match) => {
        try {
            const chatId = msg.chat.id;
            const userId = msg.from.id;

            if (msg.from.is_bot) {
                await sendEphemeral(bot, chatId, 'Bots are not allowed to use this command.');
                return;
            }

            const isAdmin = await checkAdmin(bot, chatId, userId);
            if (!isAdmin) {
                await sendEphemeral(bot, chatId, 'Only admins can use this command.');
                return;
            }

            const inviteLink = `${process.env.CLIENT_URL}/join/${chatId}`;
            await sendEphemeral(bot, chatId, inviteLink);


        } catch (error) {
            console.error('An error occurred:', error);
        }
    });

    // bot.onText(/\/get-link/, async (msg, match) => {
    //     try {
    //         console.log('get-link');
    //         const chatId = msg.chat.id;
    //         const userId = msg.from.id;

    //         if (msg.from.is_bot) {
    //             await sendEphemeral(bot, chatId, 'Bots are not allowed to use this command.');
    //             return;
    //         }

    //         const isAdmin = await checkAdmin(bot, chatId, userId);
    //         if (!isAdmin) {
    //             await sendEphemeral(bot, chatId, 'Only admins can use this command.');
    //             return;
    //         }

    //         const inviteLink = await getInviteLink(bot, chatId);
    //         console.log('inviteLink is ', inviteLink);
    //         await sendEphemeral(bot, chatId, inviteLink, 60 * 3 * 1000);
    //     } catch (error) {
    //         console.error('An error occurred:', error);
    //     }

    // });

    // bot.onText(/\/configure/, async (msg) => {
    //     const chatId = msg.chat.id;
    //     const userId = msg.from.id;
    //     const isAdmin = await checkAdmin(bot, chatId, userId);
    //     if (!isAdmin) {
    //         sendEphemeral(bot, chatId, 'Only admins can use this command.');
    //         return;
    //     }
    //     chatStates[chatId] = {
    //         confStage: 1,
    //     };
    //     await bot.sendMessage(chatId, 'Configuring Bot...\nStep 1: Select a Provider', providerOptions);
    // });

    // bot.on('callback_query', (query) => {
    //     const { message, data } = query;
    //     const chatId = message.chat.id;
    //     const state = chatStates[chatId];
    //     if (!state) return;
    //     switch (state.confStage) {
    //         case 1:
    //             state.option1 = data;
    //             state.confStage = 2;
    //             bot.sendMessage(chatId, 'Step 2: Select the Operator', operatorOptions);
    //             break;
    //         case 2:
    //             state.option2 = data;
    //             state.confStage = 3;
    //             bot.sendMessage(chatId, 'Step 3: Enter the Value (Matching will be case-sensitive)', textOptions)
    //                 .then(sentMessage => {
    //                     bot.onReplyToMessage(sentMessage.chat.id, sentMessage.message_id, async (reply) => {
    //                         const userInput = reply.text;
    //                         if (!userInput || userInput.length === 0) {
    //                             bot.sendMessage(chatId, 'Invalid Value. Please try again.');
    //                             return;
    //                         }
    //                         state.option3 = userInput;
    //                         const groupConfig = await GroupConfig.findOne({ groupId: chatId });
    //                         if (groupConfig) {
    //                             groupConfig.data = {
    //                                 ...groupConfig.data,
    //                                 provider: state.option1,
    //                                 operator: state.option2,
    //                                 value: state.option3,
    //                             };
    //                             await groupConfig.save();
    //                         }
    //                         else {
    //                             const newGroupConfig = await createGroupConfig(bot, chatId);
    //                             newGroupConfig.data = {
    //                                 provider: state.option1,
    //                                 operator: state.option2,
    //                                 value: state.option3,
    //                             };
    //                             await newGroupConfig.save();
    //                         }
    //                         bot.sendMessage(chatId, 'Bot configured successfully.');
    //                     });
    //                 }).catch(err => {
    //                     console.log(err);
    //                 });
    //             break;
    //         default:
    //             break;
    //     };
    // });
};

module.exports = adminCommands;
