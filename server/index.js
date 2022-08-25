// server/index.js
const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');

// Services
const projectsService = require('./services/projectsService')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.post("/api/addProject", (req, res) => {
    projectsService.addProject({ ...req });
    res.json({ message: "projectAdded" });
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