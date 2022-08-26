import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    const [userProjects, setUserProjects] = React.useState([])

    React.useEffect(() => {
        axios.post('/api/getProject', { projectId: "63080183d3d55386efacc73e" })
            .then((res) => {
                console.log(res);
                let project = res.data
                setUserProjects(arr => [...arr, project]);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    let navigate = useNavigate();
    const toProject = (projectId) => {
        navigate(`${projectId}`);
    }

    const confirmDeleteProject = (projectId) => {
        axios.post('/api/deleteProject', { projectId })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
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
                                {project.project_name}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                {project.lastWorkedOn}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => toProject(project._id)}>Continue</span>
                                <span style={{ margin: '0 0.5em' }}>|</span>
                                <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => confirmDeleteProject(project._id)}>Delete</span>
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
