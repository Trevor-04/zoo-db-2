const {query, connect, disconnect} = require('../functions/database');


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

