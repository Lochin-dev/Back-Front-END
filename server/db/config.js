const { Pool } = require('pg')

const client = new Pool({
    user: 'postgres',
    database: 'home_db',
    port: 5432,
    password: "Lochin2212",
    host: 'localhost'
});


// const client = new Pool({
//     connectionString: 'postgres://kaalcqgk:adoep_bFT0bba8jHKatV2aWwH7wwxfYX@drona.db.elephantsql.com/kaalcqgk'
// })


// const client = new Pool({
//     user: 'kaalcqgk',
//     database: 'kaalcqgk',
//     port: 5432,
//     password: "adoep_bFT0bba8jHKatV2aWwH7wwxfYX",
//     host: 'drona.db.elephantsql.com'
// });
// client.connect()

module.exports = client;


