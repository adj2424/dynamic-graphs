import React, { useRef, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const MenuBar = (props) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Button color="inherit">Cut</Button>
            <Button color="inherit">Copy</Button>
            <Button color="inherit">Paste</Button>
            <Button color="inherit">Undo</Button>
            <Button color="inherit">Redo</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default MenuBar;
