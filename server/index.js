// server/index.js
const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');

// Managers
const ProjectsManager = require('./managers/ProjectsManager');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.post("/api/addProject", (req, res) => {
    let project = req.body;
    ProjectsManager.addProject({ ...project });
    res.json({ message: "projectAdded" });
})

app.post("/api/getProject", async (req, res) => {
    let projectId = req.body.projectId;
    const result = await ProjectsManager.getProjectById(projectId);
    res.json({ ...result });
})

app.post("/api/deleteProject", (req, res) => {
    let projectId = req.body.projectId;
    ProjectsManager.deleteProjectById(projectId);
    res.json({ message: "project deleted"});
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});



// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});