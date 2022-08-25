//projectsService.js

require('dotenv').config();

const { MongoClient } = require('mongodb');

const databaseName = "TraceIt";
const collectionName = "Projects";


function getMongoClient() {
    const uri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@traceitserver.fywjr.mongodb.net/?retryWrites=true&w=majority`;
    return new MongoClient(uri);
}

// CRUD operation

//C => create
async function addProject({ project_name, img_link, canvas_width, canvas_height, unit }){
    const client = getMongoClient();
    try{
        const newProject = {
            creator_id: "1",
            project_name: project_name,
            img_link: img_link,
            canvas_width: canvas_width,
            canvas_height: canvas_height,
            unit: unit,
            lastWorkedOn: Date.now()
        }
        const databaseContext = client.db(databaseName);
        const collection = databaseContext.collection(collectionName);
        const result = await collection.insertOne(newProject);
        console.log(`New listing created with the following id: ${result.insertedId}`);

        await client.close();
    } 
    catch (e){
        await client.close();
        console.error(e);
    }
}

//R => read
async function getProject({  }){

}

//U => update
async function updateProject({  }){

}

//D => delete
async function deleteProject({  }){

}

module.exports = { addProject, getProject, updateProject, deleteProject }