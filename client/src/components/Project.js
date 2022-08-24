import React from 'react';
import { useParams } from 'react-router-dom';

const Project = () => {
    let params = useParams();

    return (
    <div>
        <h1>Project : { params.projectId }</h1>
    </div>
    );
}

export default Project;
