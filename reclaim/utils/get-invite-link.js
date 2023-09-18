const getInviteLink = async (bot, chatId) => {
    try {
        // Create an invite link with a 3-minute duration
        const inviteLink = await bot.createChatInviteLink(chatId, {expiryDate: Math.floor(Date.now() / 1000) + 60 * 3});

        // Revoke the invite link after 3 minutes
        setTimeout(async () => {
            console.log('Invite Link revoked');
            await bot.revokeChatInviteLink(chatId, inviteLink.invite_link);
        }, 5 * 60 * 1000); // 3 minutes in milliseconds

        // Return the invite link
        return inviteLink.invite_link;
    } catch (error) {
        console.error('Error:', error.message);
        return null; // Return null in case of an error
    }
};

module.exports = { getInviteLink };
