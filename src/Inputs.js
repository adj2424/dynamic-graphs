import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Inputs = (props) => {
  //gets data
  let data = JSON.parse(JSON.stringify(props.json.data));
  const key1 = Object.keys(data[0])[0];
  const key2 = Object.keys(data[0])[1]; //population
  const appendData = () => {
    const y = document.getElementById('year').value;
    const p = parseFloat(document.getElementById('population').value);
    //deep clone because datagrid freezes array
    let data = JSON.parse(JSON.stringify(props.json.data));
    let obj = {};
    //adds new object to data
    obj[key1] = y;
    obj[key2] = p;
    data.push(obj);
    //console.log(data);
    props.setJson({
      ...props.json,
      data: data
    });
  };

  return (
    <div>
      <Box>
        <TextField id={key1} label={key1} variant="outlined" />
        <TextField id={key2} label={key2} variant="outlined" />
        <Button onClick={appendData} variant="contained">
          Append
        </Button>
      </Box>
    </div>
  );
};

export default Inputs;
