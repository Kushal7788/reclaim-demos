const { User } = require('../../models/User');
const { Group } = require('../../models/Group');
const sendMessage = require('./send-msg');

const isInteger = (value) => {
    if (isNaN(value)) {
        return false;
    }
    const x = parseFloat(value);
    return (x | 0) === x;
}

const getIntegerValue = (value) => {
    if (isInteger(value)) {
        return parseInt(value);
    }
    else {
        return parseFloat(value);
    }
}

const verifyMember = async (bot, check) => {
    try {
        const proofParam = check.data.proofParams.param;
        const guildConfig = await Group.findOne({ groupId: check.data.guildId });
        const userConfig = await User.findOne({ userId: check.data.memberId, groupId: check.data.guildId });
        if (!userConfig) {
            throw new Error(`User config not found for ${check.data.memberId} in ${check.data.guildId}`);
        }
        let isMemberVerified = false;
        if (guildConfig.data.operator === 'EQ') {
            proofParam === guildConfig.data.value ? isMemberVerified = true : isMemberVerified = false;
        }
        else if (guildConfig.data.operator === 'INC') {
            proofParam.includes(guildConfig.data.value) ? isMemberVerified = true : isMemberVerified = false;
        }
        else if (guildConfig.data.operator === 'NINC') {
            proofParam.includes(guildConfig.data.value) ? isMemberVerified = false : isMemberVerified = true;
        }
        else if (guildConfig.data.operator === 'GT') {
            if (isInteger(proofParam)) {
                getIntegerValue(proofParam) > getIntegerValue(guildConfig.data.value) ? isMemberVerified = true : isMemberVerified = false;
            }
            else {
                isMemberVerified = false;
            }
        }
        else if (guildConfig.data.operator === 'LT') {
            if (isInteger(proofParam)) {
                getIntegerValue(proofParam) < getIntegerValue(guildConfig.data.value) ? isMemberVerified = true : isMemberVerified = false;
            }
            else {
                isMemberVerified = false;
            }
        }
        else if (guildConfig.data.operator === 'GTE') {
            if (isInteger(proofParam)) {
                getIntegerValue(proofParam) >= getIntegerValue(guildConfig.data.value) ? isMemberVerified = true : isMemberVerified = false;
            }
            else {
                isMemberVerified = false;
            }
        }
        else if (guildConfig.data.operator === 'LTE') {
            if (isInteger(proofParam)) {
                getIntegerValue(proofParam) <= getIntegerValue(guildConfig.data.value) ? isMemberVerified = true : isMemberVerified = false;
            }
            else {
                isMemberVerified = false;
            }
        }

        if (isMemberVerified) {
            try {
                userConfig.data = {
                    ...userConfig.data,
                    isVerified: true,
                };
                await userConfig.save();
                await sendMessage(bot, userConfig.userId, 'You have been verified!');
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            await sendMessage(bot, userConfig.userId, 'You have not been verified due to not fitting the criteria.');
        }
        return isMemberVerified;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { verifyMember };