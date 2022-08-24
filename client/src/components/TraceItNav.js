import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';

import { useNavigate } from 'react-router-dom';


const TraceItNav = () => {
    let navigate = useNavigate();

    const toHome = () => {
        console.log('Logo clicked')
    }

    const toMyProjects = () => {
        navigate('/myProjects');
    }
    const toAbout = () => {
        navigate('/about');
    }
    const toSettings = () => {
        navigate('/settings');
    }


    return (
    <div>
        <AppBar sx={{ backgroundColor:'green' }} position='static'>
            <Toolbar>
                <Typography variant="h6" 
                    component="div" 
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={toHome}
                >
                    TraceIt
                </Typography>
                <Button color="inherit"
                    onClick={toMyProjects}
                >
                    My Projects
                </Button>
                <Button color="inherit"
                    onClick={toAbout}
                >
                    About
                </Button>
                <IconButton color="inherit"
                    edge='start'
                    area-label='settings'
                    sx={{ borderRadius: 0, marginLeft: 0}}
                    onClick={toSettings}
                >
                    <SettingsIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    </div>
    );
}

export default TraceItNav;