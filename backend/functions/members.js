const {query} = require('../functions/database');

module.exports.newMember = async function (memberData) {
    try {
        module.exports.validateMemberData(memberData);
        const {memberType = 0, memberTerm = null, subscribed_on = null, last_billed = null, memberEmail, memberPhone, memberFName, memberLName, memberBirthday} = memberData;
        
        return await query(`
        INSERT INTO Members (memberType, memberTerm, subscribed_on, last_billed, memberEmail, memberPhone, memberFName, memberLName, memberBirthday)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [memberType, memberTerm, subscribed_on, last_billed, memberEmail, memberPhone, memberFName, memberLName, memberBirthday])
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.newMemberLogin = async function (memberData) {
    const {memberEmail, memberPassword, memberID} = memberData;
    try {
        return await query(`INSERT INTO Member_logins (memberEmail, memberPassword, memberID)
        VALUES (?, ?, ?)`,
        [memberEmail, memberPassword, memberID]);
    } catch (err) {
        console.error(err);
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

module.exports.updateMember = async function (memberID, updatedData) {
    const { memberFName, memberLName, memberEmail, memberPhone, memberBirthday } = updatedData;
    const formattedBirthday = memberBirthday ? new Date(memberBirthday).toISOString().split('T')[0] : null;
    try {
        return await query(`
        UPDATE Members 
        SET memberFName = ?, memberLName = ?, memberEmail = ?, memberPhone = ?, memberBirthday = ?
        WHERE memberID = ?`,
        [memberFName, memberLName, memberEmail, memberPhone, formattedBirthday, memberID]);
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

module.exports.getMembersByBirthday = async function (memberData) {
    const {memberBirthday} = memberData;
    try {
        return await query(`SELECT * FROM Members
        WHERE memberBirthday =?`,
        [memberBirthday]);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.validateMemberData = async function (memberData) {
    const {memberID, memberType, memberEmail, memberFName, memberLName, memberTerm} = memberData;

    if (memberID && (typeof memberID !== 'number')) {
        throw new Error('Invalid or missing memberID');
    }

    if (memberType &&  typeof memberType !== 'number') {
        throw new Error('Invalid memberType. Must be a number');
    }

    if (memberEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberEmail)) {
        throw new Error('Invalid email format');
    }

    if (memberFName && typeof memberFName !== 'string') {
        throw new Error('First name is required and should be a string');
    }

    if (memberLName && typeof memberLName !== 'string') {
        throw new Error('Last name is required and should be a string');
    }

    if (memberTerm && typeof memberTerm !== 'number') {
        throw new Error('Invalid or missing memberTerm. It must be a number');
    }
}

