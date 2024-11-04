const {query} = require('../functions/database.js');

module.exports.addDonation = async function(donationData) {
    const {email, firstName, lastName,address1, address2, city, state, zip, country, phone, amount, donationType} = donationData;

    try {
        const result = await query(`
        INSERT INTO donations (email, firstName, lastName, address1, address2, city, state, zip, country, phone, amount, donationType)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [email, firstName, lastName, address1, address2, city, state, zip, country, phone, amount, donationType]);
        return result;
    
    } catch (error) {
        console.error("Error in addDonation function:", error);
        throw error;
        
    }
}

module.exports.getDonations = async function() {
    try {
        const donations = await query("SELECT * FROM donations");
        return donations;
    } catch (error) {
        console.error("Error in getDonations function:", error);
        throw error;
    }
}

module.exports.getTotalDonations = async function() {
    try {
        const sumOfDonations = await query(`SELECT SUM(amount) as TotalDonations FROM donations`);
        console.log(sumOfDonations)
        return sumOfDonations
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.getDonationById = async function(id) {
    try {
        const donation = await query("SELECT * FROM donations WHERE donation_id = ?", [id]);
        return donation;
    } catch (error) {
        console.error("Error in getDonationById function:", error);
        throw error;
    }
}

module.exports.getDonationsByEmail = async function(email) {
    try {
        const donations = await query("SELECT * FROM donations WHERE email = ?", [email]);
        return donations;
    } catch (error) {
        console.error("Error in getDonationsByEmail function:", error);
        throw error;
    }
};

module.exports.getDonationsByDateRange = async function(startDate, endDate) {
    try {
        const donations = await query(
            `SELECT * FROM donations 
             WHERE createdAt BETWEEN ? AND ?`,
            [startDate, endDate]
        );
        return donations;
    } catch (error) {
        console.error("Error in getDonationsByDateRange function:", error);
        throw error;
    }
};

module.exports.getTotalDonationAmount = async function(donationData) {
    try {
        const {startDate, endDate} = donationData;
        let result;
        if (!startDate && !endDate) {
            result = await query("SELECT SUM(amount) AS totalAmount FROM donations");
        } else {
            result = await query(`SELECT SUM(amount) AS totalAmount FROM donations
            WHERE createdAt BETWEEN ? AND ?`, [startDate, endDate]);
        }

        return result[0].totalAmount;
    } catch (error) {
        console.error("Error in getTotalDonationAmount function:", error);
        throw error;
    }
};
