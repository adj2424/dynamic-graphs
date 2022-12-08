import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

const MenuBar = props => {
  // clears data
  const emptyData = () => {
    //const url = `http://localhost:3001/data/update`;
    const empty = {
      title: '',
      data: [{ '.': '', _: '' }]
    };
    props.setJson(empty);
    /*
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(empty)
    }).catch(error => {
      console.error('Error:', error);
    });
    */
  };

  // saves data to mongodb
  const save = () => {
    const url = `http://localhost:3001/data/update`;
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.json)
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  // helper function
  const loadHelper = e => {
    var jsonData = JSON.parse(e.target.result);
    props.setJson(jsonData);
  };

  // parses and reads json
  const load = e => {
    var reader = new FileReader();
    reader.onload = loadHelper;
    reader.readAsText(e.target.files[0]);
  };

  // cut function
  const cut = () => {
    let data = JSON.parse(JSON.stringify(props.json.data));
    let kept = [];
    let removed = [];
    data.forEach(elem => {
      if (!props.selection.includes(elem.id)) {
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
    data.forEach(elem => {
      // selects all copied elem
      if (props.selection.includes(elem.id)) {
        copied.push(elem);
      }
    });
    props.setCopied(copied);
  };

  const paste = () => {
    // checks array is not empty
    if (!props.copied.length < 1) {
      let data = JSON.parse(JSON.stringify(props.json.data));
      // appends data together
      data = [...data, ...props.copied];
      props.setJson({
        ...props.json,
        data: data
      });
    }
  };
  MenuBar.propTypes = {
    json: PropTypes.object,
    selection: PropTypes.array,
    setJson: PropTypes.func,
    setCopied: PropTypes.func,
    copied: PropTypes.array
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Button color="inherit" onClick={emptyData}>
              New
            </Button>
            <Button color="inherit" onClick={save}>
              Save
            </Button>
            <Button color="inherit" component="label">
              Load
              <input type="file" hidden onChange={e => load(e)} />
            </Button>
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
