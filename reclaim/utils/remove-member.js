const { User } = require('../../models/User');

const removeMember = async (userId, chatId) => {
    try {
        await User.deleteOne({ userId: userId, groupId: chatId});
    } catch (error) {
        console.error(`An error occurred while adding the role to the user ${member.username}`, error);
    }
}

module.exports = { removeMember };