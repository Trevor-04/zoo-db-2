const {query, connect, disconnect} = require('../functions/database');


module.exports.deleteAnimal = async function (animalID) {
    return query(`DELETE FROM Animals WHERE animal_id=${animalID}`);
}

module.exports.listAllAnimals = async function () {
    return query(`SELECT * FROM Animal`);  
}

module.exports.getAnimalById = async function (animalID) {
    const result = await query(`SELECT * FROM Animals WHERE animal_id=${animalID}`);
    return result[0]; 
}

