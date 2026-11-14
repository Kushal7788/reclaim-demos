const sendMessage = async (bot, chatId, messageText) => {
    bot.sendMessage(chatId, messageText)
        .catch((error) => {
            console.error('Error sending message: ', error.message);
        });
};

module.exports = sendMessage;