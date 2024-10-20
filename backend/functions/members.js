const {query} = require('../functions/database');

module.exports.newMember = async function (memberData) {
    try {
        validateMemberData(memberData);
        const {memberID, memberType, memberTerm, subscribed_on, last_billed, memberEmail, memberPhone, memberFName, memberLName} = memberData;
        return await query(`
        INSERT INTO Members (memberID, memberType, memberTerm, subscribed_on, last_billed, memberEmail, memberPhone, memberFName, memberLName)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [memberID, memberType, memberTerm, subscribed_on, last_billed, memberEmail, memberPhone, memberFName, memberLName])
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.getMember = async function(memberData) {
    const {memberID} = memberData;
    try {
        return query(`
        SELECT * 
        FROM Members
        WHERE memberID = ?`,
        [memberID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.billed = async function (memberData) {
    const {memberID} = memberData;
    try {
        return await query(`
        UPDATE Members
        SET last_billed = NOW(),
        WHERE memberID  = ?`,
        [memberID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.validateMemberData = async function (memberData) {
    const {memberID, memberType, memberEmail, memberFName, memberLName} = memberData;

    if (!memberID || typeof memberID !== 'number') {
        throw new Error('Invalid or missing memberID');
    }

    if (!memberType || !['Standard', 'Premium'].includes(memberType)) {
        throw new Error('Invalid memberType. It must be either "Standard" or "Premium"');
    }

    if (!memberEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberEmail)) {
        throw new Error('Invalid email format');
    }

    if (!memberFName || typeof memberFName !== 'string') {
        throw new Error('First name is required and should be a string');
    }

    if (!memberLName || typeof memberLName !== 'string') {
        throw new Error('Last name is required and should be a string');
    }

    if (!memberTerm || typeof memberTerm !== 'number') {
        throw new Error('Invalid or missing memberTerm. It must be a number');
    }
}

