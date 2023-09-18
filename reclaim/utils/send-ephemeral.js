const sendEphemeral = async (bot, chatId, messageText, timeout = 7000) => {
    bot.sendMessage(chatId, messageText)
        .then((message) => {
            // Delete the message after a certain time period (e.g., 7 seconds)
            setTimeout(() => {
                bot.deleteMessage(chatId, message.message_id)
                    .catch((error) => {
                        console.error('Error deleting message: ', error.message);
                    });
            }, 7000); // 5000 milliseconds (5 seconds)
        })
        .catch((error) => {
            console.error('Error sending message: ', error.message);
        });
};

module.exports = sendEphemeral;