const {query} = require('../functions/database');

module.exports.addNewAnimal = async function (animalData) {
    const { name, sex, date_acquired, date_died, date_born, species, classification, enclosureID } = animalData;

    try {
        return await query(`
            INSERT INTO Animals (name, sex, date_acquired, date_died, date_born, species, classification, enclosureID)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [name, sex, date_acquired, date_died, date_born, species, classification, enclosureID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.deleteAnimal = async function (animalData) {
    const {animalID} = animalData;
    try {
        return query(`DELETE FROM Animals WHERE animalID=?`, 
        [animalID]);
    } catch (err) {
        console.log(err);
        throw err;
    }

}

module.exports.listAllAnimals = async function () {
    try {
        return query(`
            SELECT A.*, E.enclosureName
            FROM Animals AS A
            LEFT JOIN Enclosures AS E ON A.enclosureID = E.enclosureID
        `); 
    } catch (err) {
        console.error("Error listing all animals:", err);
        throw new Error("Failed to list all animals");
    }
};

module.exports.getAnimalById = async function (animalData) {
    const {animalID} = animalData;
    try {
        const result = await query(`SELECT * FROM Animals WHERE animalID=?`, [animalID]);
        return result[0]; 
    } catch(err) {
        console.log(err);
        throw err;
    }
}

module.exports.getAnimalBySpecies = async function(animalData) {
    const {species} = animalData;
     try {
        return await query(`
        SELECT * 
        FROM Animals 
        WHERE species=?`, 
        [species]);
     } catch(e) {
         console.log(e);
         throw e;
     }
}

module.exports.getAnimalsbyEnclosure = async function(animalData) {
    const {enclosureID, enclosureName} = animalData;
    try {

        if (enclosureName) {
            return await query(`
            SELECT * 
            FROM Animals 
            JOIN Enclosures
            ON Animals.enclosureID = Enclosures.enclosureID
            WHERE Enclosures.enclosureName=?`, 
            [enclosureName]);
        } else if (enclosureID) {
            return await query(`
            SELECT * 
            FROM Animals 
            WHERE enclosureID=?`, 
            [enclosureID]);
        }

    } catch (err) {
        console.log(err);
        throw err;
    } 
}

module.exports.getAnimalsbyExhibit= async function(animalData) {
    const {exhibitID, exhibitName} = animalData;
    try {

        if (exhibitName) {
            return await query(`
            SELECT * 
            FROM Animals 
            JOIN Exibits
            ON Animals.enclosureID = Enclosures.enclosureID
            WHERE Enclosures.enclosureName=?`, 
            [enclosureName]);
        } else if (exhibitID) {
            return await query(`
            SELECT * 
            FROM Animals 
            WHERE enclosureID=?`, 
            [exhibitID]);
        }

    } catch (err) {
        console.log(err);
        throw err;
    } 
}

module.exports.getAnimalsByExhibit = async function(animalData) {
    const { exhibitName } = animalData;

    if (!exhibitName && !exhibitID) throw new Error('Either exhibitName or exhibitID must be provided');
    try {
        let results; 

        if (exhibitName === "all") {
            results = await query(`
                SELECT * 
                FROM Animals AS A
                JOIN Enclosures AS En ON A.enclosureID = En.enclosureID
                JOIN Exhibits AS Ex ON En.exhibitID = Ex.exhibitID
            `);
        } else {
            results = await query(`
                SELECT * 
                FROM Animals AS A
                JOIN Enclosures AS En ON A.enclosureID = En.enclosureID
                JOIN Exhibits AS Ex ON En.exhibitID = Ex.exhibitID
                WHERE Ex.exhibitName = ?
            `, [exhibitName]);
        }

        return results || [];
    } catch (err) {
        console.log(err);
        throw err;
    }
};


module.exports.editAnimal = async function (animalData) {
    const {
        animalID,
        name,
        sex,
        date_acquired,
        date_died = null,
        date_born = null,
        species,
        classification,
        enclosureID,
    } = animalData;

    if (!animalID) {
        throw new Error("Animal ID is required to edit an animal.");
    }

    try {
        const result = await query(
            `UPDATE Animals 
            SET 
                name = ?, 
                sex = ?, 
                date_acquired = ?, 
                date_died = ?, 
                date_born = ?, 
                species = ?, 
                classification = ?, 
                enclosureID = ? 
            WHERE animalID = ?`,
            [
                name,
                sex,
                new Date(date_acquired).toISOString().split("T")[0],
                date_died ? new Date(date_died).toISOString().split("T")[0] : null,
                date_born ? new Date(date_born).toISOString().split("T")[0] : null,
                species,
                classification,
                enclosureID,
                animalID,
            ]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Animal with ID ${animalID} not found.`);
        }

        return result;
    } catch (err) {
        console.error("Error in editAnimal function:", err);
        throw err;
    }
};