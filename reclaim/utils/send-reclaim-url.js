const { getReclaimUrlFunction } = require('./get-reclaim');
const QRCode = require('qrcode');
const fs = require('fs');


// Sending reclaim url to user

const sendReclaimUrl = async (bot, chatId, userId, username, groupTitle, provider) => {
    // const chatId = message.chat.id;
    // const userId = message.from.id;
    // const username = message.from.first_name;
    // const groupTitle = message.chat.title;

    try {
        const url = await getReclaimUrlFunction(userId, chatId, provider);
        if (!url || url === '') {
            console.log(`Could not create reclaim url for ${username}.`);
        } else {
            console.log(`Sending a QR code message to ${username}.`)
            QRCode.toFile(`qrimages/${userId}.png`, url, async (err) => {
                if (err) {
                    console.log('FATAL:', err);
                }
                await bot.sendPhoto(userId, fs.readFileSync(`qrimages/${userId}.png`), {
                    caption: `Hello, "${username}!" You are not verified in the "${groupTitle}" group. Please verify soon to avoid being kicked out of the group\n\nUrl for verification: ${url}`
                });
                return;
            });
        }
    } catch (error) {
        console.error(error);
        await sendMessage(bot, userId, 'Something went wrong!');
        return;
    }
}

module.exports = { sendReclaimUrl };