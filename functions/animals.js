const {query, connect, disconnect} = require('../functions/database');


module.exports.deleteAnimal = async function (animalID) {
    return query(`DELETE FROM Animals WHERE animal_id=${animalID}`);
}

