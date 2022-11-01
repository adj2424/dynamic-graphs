import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const MenuBar = (props) => {
  // cut function
  const cut = () => {
    //console.log(props.selected);
    let data = JSON.parse(JSON.stringify(props.json.data));
    let kept = [];
    let removed = [];
    data.forEach((elem) => {
      if (!props.selected.includes(elem.id)) {
        //selected elem
        kept.push(elem);
      } else {
        //elem to be removed
        removed.push(elem);
      }
    });
    //updates the data to remove the cut data
    props.setJson({
      ...props.json,
      data: kept
    });
    //adds the cut data to paste data
    props.setCopied(removed);
  };

  //adds the selected data to paste data
  const copy = () => {
    let data = JSON.parse(JSON.stringify(props.json.data));
    let copied = [];
    data.forEach((elem) => {
      // selects all copied elems
      if (props.selected.includes(elem.id)) {
        copied.push(elem);
      }
    });
    props.setCopied(copied);
  };

  const paste = () => {
    // checks array is not empty
    if (!props.copied.length < 1) {
      console.log('sus');
      let data = JSON.parse(JSON.stringify(props.json.data));
      // appends data together
      data = [...data, ...props.copied];
      props.setJson({
        ...props.json,
        data: data
      });
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Button color="inherit" onClick={cut}>
              Cut
            </Button>
            <Button color="inherit" onClick={copy}>
              Copy
            </Button>
            <Button color="inherit" onClick={paste}>
              Paste
            </Button>
            <Button color="inherit">Undo</Button>
            <Button color="inherit">Redo</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default MenuBar;
