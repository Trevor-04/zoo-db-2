const {query, connect, disconnect} = require('../backend/functions/database');

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
        return query(`DELETE FROM Animals WHERE animal_id=?`, 
        [animalID]);
    } catch (err) {
        console.log(err);
        throw err;
    }

}

module.exports.listAllAnimals = async function () {
    try {
        return query(`SELECT * FROM Animal`); 
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.getAnimalById = async function (animalData) {
    const {animalID} = animalData;
    try {
        const result = await query(`SELECT * FROM Animals WHERE animal_id=?`, [animalID]);
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
            ON Animals.exibitID = Enclosures.enclosureID
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
