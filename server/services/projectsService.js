//projectsService.js
const { ObjectId } = require("mongodb");
require('dotenv').config();

const traceItDbConn = require('../databaseConnections/TraceItConnection')
traceItDbConn.connectToServer((a) => {console.log(a)});
const collectionName = "Projects";

// CRUD operation

//C => create
async function addProject({ project_name, img_link, canvas_width, canvas_height, unit }){
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
        const dbConnect = traceItDbConn.getDb();
        const collection = dbConnect.collection(collectionName);
        const result = await collection.insertOne(newProject);
        console.log(`New project created with the following id: ${result.insertedId}`);

    } 
    catch (e){
        console.error(e);
    }
}

//R => read
async function getProject( projectId ){
    try{
        const dbConnect = traceItDbConn.getDb();
        const collection = dbConnect.collection(collectionName);
        const result = await collection.findOne({ _id: new ObjectId(projectId) });
        console.log(`Project with id = ${projectId} found. Project name = ${result.project_name}`);
        return result;
    } 
    catch (e){
        console.error(e);
    }
}

//U => update
async function updateProject({  }){

}

//D => delete
async function deleteProject(projectId){
    try{
        const dbConnect = traceItDbConn.getDb();
        const collection = dbConnect.collection(collectionName);
        await collection.deleteOne({ _id: new ObjectId(projectId) });
        console.log(`Deleted project with id = ${projectId}.`);
    } 
    catch (e){
        console.error(e);
    }
}

module.exports = { addProject, getProject, updateProject, deleteProject }