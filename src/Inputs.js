import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Inputs = (props) => {
  const appendData = () => {
    const y = document.getElementById('year').value;
    const p = parseFloat(document.getElementById('population').value);
    const data = props.json.data;
    data.push({
      year: y,
      population: p
    });
    //console.log(data);
    props.setJson({
      ...props.json,
      title: 'changed',
      data: data
    });
  };

  return (
    <div>
      <Box>
        <TextField id="year" label="Year" variant="outlined" />
        <TextField id="population" label="Population" variant="outlined" />
        <Button onClick={appendData} variant="contained">
          Contained
        </Button>
      </Box>
    </div>
  );
};

export default Inputs;
