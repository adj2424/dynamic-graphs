/**
 * Project 1
 */
import React, { useState } from 'react';
import BarChart from './BarChart';
import Inputs from './Inputs';
import MenuBar from './MenuBar';
const App = () => {
  //init data for placeholder
  const init = {
    title: 'World Population',
    data: [
      { year: '1950', population: 2.525 },
      { year: '1960', population: 3.018 },
      { year: '1970', population: 3.682 },
      { year: '1980', population: 4.44 },
      { year: '1990', population: 5.31 },
      { year: '2000', population: 6.127 },
      { year: '2010', population: 6.93 }
    ]
  };

  //states
  const [json, setJson] = useState(init);
  const [selection, setSelection] = useState([]);
  const [copied, setCopied] = useState([]);

  return (
    <div>
      <MenuBar json={json} setJson={setJson} selection={selection} copied={copied} setCopied={setCopied}></MenuBar>
      <BarChart
        json={json}
        setSelection={setSelection}
        selection={selection}
        min={null}
        max={null}
        step={null}
      ></BarChart>
      <Inputs json={json} setJson={setJson}></Inputs>
    </div>
  );
};

export default App;
