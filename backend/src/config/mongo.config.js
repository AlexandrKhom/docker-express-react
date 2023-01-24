const mongoose = require("mongoose");
require('dotenv').config({path:'../.env'})

module.exports.connectionDB = async () => {
    let dbCon = false

    while (!dbCon) {
        try {
            console.log('Connecting to database...')
            await mongoose.set("strictQuery", false);
            await mongoose.connect(process.env.MONGO_URI);
            dbCon = true
            console.log('Database available!!!')
        } catch (e) {
            console.log('Database unavailable, wait 3 seconds')
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}