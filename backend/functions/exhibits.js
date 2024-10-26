const { query } = require('../functions/database');

module.exports.addExhibit = async function (exhibitData) {
    const { exhibitName, founded_on, closed_on, closure_reason, sponsorID, headkeeperID } = exhibitData;

    try {
        return await query(`
            INSERT INTO Exhibits (exhibitName, founded_on, closed_on, closure_reason, sponsorID, headkeeperID)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [exhibitName, founded_on, closed_on, closure_reason, sponsorID, headkeeperID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports.deleteExhibit = async function (exhibitData) {
    const { exhibitID } = exhibitData;
    try {
        return await query(`DELETE FROM Exhibits WHERE exhibitID = ?`, [exhibitID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports.listAllExhibits = async function () {
    try {
        return await query(`SELECT * FROM Exhibits`);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports.getExhibitById = async function (exhibitData) {
    const { exhibitID } = exhibitData;
    try {
        const result = await query(`SELECT * FROM Exhibits WHERE exhibitID = ?`, [exhibitID]);
        return result[0]; 
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports.getExhibitByName = async function (exhibitData) {
    const { exhibitName } = exhibitData;
    try {
        const result = await query(`SELECT * FROM Exhibits WHERE exhibitName = ?`, [exhibitName]);
        return result[0]; 
    } catch (err) {
        console.log(err);
        throw err;
    }
};