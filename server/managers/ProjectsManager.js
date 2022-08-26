const projectsService = require('../services/projectsService');

function addProject({ project_name, img_link, canvas_width, canvas_height, unit }){
    projectsService.addProject({ project_name, img_link, canvas_width, canvas_height, unit });
}

function getProjectById(projectId){
    return projectsService.getProject( projectId );
}

function getAllProjects() {

}

function deleteProjectById(projectId) {
    projectsService.deleteProject(projectId);
}

module.exports = { 
    addProject, 
    getProjectById, 
    getAllProjects,
    deleteProjectById,
}