import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import CreateProjectDialog from './CreateProjectDialog';
import axios from 'axios';

const userProjects = [
    {
        id: 1,
        name: 'Picasso on 30x90',
        lastWorkedOn: 'september 9th 2022'
    },
    {
        id: 2,
        name: 'DaVinci on 30x60',
        lastWorkedOn: 'october 21st 2019'
    },
    {
        id: 3,
        name: 'Dali on 30x30',
        lastWorkedOn: 'december 25th 2020'
    },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
const ProjectsTable = () => {
    const [openCreateProject, setOpenCreateProject] = React.useState(false);

    let navigate = useNavigate();
    const toProject = (projectId) => {
        navigate(`${projectId}`);
    }

    const confirmDeleteProject = () => {
        console.log('confirm delete modal/dialog');
    }

    const openCreateProjectDialog = () => {
        setOpenCreateProject(true);
    }

    const cancelCreateProject = () => {
        setOpenCreateProject(false);
    }
    
    const createProject = ({ project_name, img_link, canvas_width, canvas_height, unit }) => {
        const postBody = { project_name, img_link, canvas_width, canvas_height, unit };
        axios.post('/api/addProject', postBody)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })

        setOpenCreateProject(false);
    };

    return (
    <div>
        <TableContainer component={Paper}>
            <Table aria-label="My TraceIt projects">
                <TableHead>
                    <StyledTableRow sx={{ fontWeight: '16px' }}>
                        <StyledTableCell>Project Name</StyledTableCell>
                        <StyledTableCell align="right">Last worked on</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {userProjects.map((project) => (
                        <StyledTableRow key={project.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                {project.name}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                {project.lastWorkedOn}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => toProject(project.id)}>Continue</span>
                                <span style={{ margin: '0 0.5em' }}>|</span>
                                <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={confirmDeleteProject}>Delete</span>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                        <TableRow>
                            <TableCell>
                                <Button variant="outlined" onClick={openCreateProjectDialog}>New Project</Button>
                            </TableCell>
                        </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>

        <CreateProjectDialog open={openCreateProject} handleCancel={cancelCreateProject} handleCreate={createProject} />
    </div>
    );
}

export default ProjectsTable;
