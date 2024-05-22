import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Container, Box } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ padding: 2 }}>
            <Container>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                            Uzair Rehman
                        </Typography>

                    </Box>
                    <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
