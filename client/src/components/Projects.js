import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import ProjectsTable from './ProjectsTable';

const Projects = () => {

    return (
    <div style={{padding: '1em'}}>
        <ProjectsTable />
    </div>
    );
}

export default Projects;
