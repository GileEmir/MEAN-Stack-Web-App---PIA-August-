const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hashedPasswordEmir = bcrypt.hashSync('Emir123!', salt);
const hashedPasswordAmar = bcrypt.hashSync('Amar123!', salt);
const hashedPasswordPera = bcrypt.hashSync('Pera123!', salt);

console.log(hashedPasswordEmir); // Copy this value
console.log(hashedPasswordAmar); // Copy this value
console.log(hashedPasswordPera); // Copy this value