import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const Table = props => {
  let data = props.json.data;
  //gets key names for x and y axis
  const key1 = Object.keys(data[0])[0];
  const key2 = Object.keys(data[0])[1]; //population

  // header info for table
  const header = [
    {
      field: key1,
      headerName: key1,
      width: 150
    },
    {
      field: key2,
      headerName: key2,
      width: 150
    }
  ];
  //gets array of selected based on id
  const select = item => {
    props.setSelection(item);
  };

  Table.propTypes = {
    json: PropTypes.object,
    selection: PropTypes.array,
    setSelection: PropTypes.func
  };
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={header}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        selectionModel={props.selection}
        onSelectionModelChange={item => select(item)}
      />
    </Box>
  );
};

export default Table;
