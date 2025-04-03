require('dotenv').config();
module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL_STRING,
        // connection:{
        //     database:process.env.DBNAME,
        //     user: process.env.DB_USER_NAME,
        //     password: process.env.DB_USER_PASSWORD
        // },
        migrations:{
            directory: __dirname = __dirname + '/db/migrations/',
        },
        seeds: {
            directory:  __dirname = './seeds/',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations:{
            directory: __dirname = '/db/migrations',
        },
    },
};