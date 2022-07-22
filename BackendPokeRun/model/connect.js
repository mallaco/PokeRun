const mysql = require('mysql'); 

const connect = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Rm27071995',
    database: 'Pokerun',

})

module.exports = connect