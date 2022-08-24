import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    let navigate = useNavigate();
    const toProject = (projectId) => {
        navigate(`${projectId}`);
    }

    const confirmDeleteProject = () => {
        console.log('confirm delete modal/dialog')
    }

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
            </Table>
        </TableContainer>
    </div>
    );
}

export default ProjectsTable;
