var { Check } = require("../../models/Check");
const allProviderParams = require("./utils.json")
const { verifyMember } = require("./verify-member");

const handleCallback = async (bot, req) => {
    try {
        const check = await Check.findOne({ checkId: req.query.id });
        if (!check) {
            return false;
        }
        check.data = {
            ...check.data,
            proofs: JSON.parse(Object.keys(req.body)[0]).proofs,
        };
        check.data = {
            ...check.data,
            proofParams: check.data.proofs.map((proof) => {
                if (allProviderParams.hasOwnProperty(proof.provider)) {
                    const paramaters = JSON.parse(proof.parameters);
                    let obj = {};
                    obj["param"] = paramaters[allProviderParams[proof.provider]['param1']];
                    return obj;
                }
                else {
                    return JSON.parse(proof.parameters);
                }
            }),
        };
        check.data.proofParams = check.data.proofParams.reduce((result, currentObject) => {
            return { ...result, ...currentObject };
        }, {});
        await check.save();
        const verifyStatus = await verifyMember(bot, check);
        if (verifyStatus) {
            return true;
        }
        else {
            return false
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = handleCallback;