import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';

const TraceItNav = () => {
    const goHome = () => {
        console.log('Logo clicked')
    }

    return (
    <div>
        <AppBar position='static'>
            <Toolbar>
                <Typography variant="h6" 
                    component="div" 
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={goHome}
                >
                    TraceIt
                </Typography>

                <Button color="inherit">My Projects</Button>
                <Button color="inherit">About</Button>
                <IconButton color="inherit"
                    edge='start'
                    area-label='settings'
                    sx={{ borderRadius: 0, marginLeft: 0}}
                >
                    <SettingsIcon />
                </IconButton>

            </Toolbar>
        </AppBar>
    </div>
    );
}

export default TraceItNav;