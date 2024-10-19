const {query, connect, disconnect} = require('../functions/database');

module.exports.newMember = async function (memberData) {
    try {
        const results = await query(`
        INSERT INTO Members ()`)
    } catch (err) {
        console.log(err);
        throw err;
    }
}