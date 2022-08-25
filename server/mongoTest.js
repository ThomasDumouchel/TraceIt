// MongoTest
require('dotenv').config();

const { MongoClient } = require('mongodb');

async function mongoTest() {
    const uri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@traceitserver.fywjr.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);

    try{
        await client.connect();
        await listDatabases(client);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    } 
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);
    });
}

mongoTest().catch(console.error);