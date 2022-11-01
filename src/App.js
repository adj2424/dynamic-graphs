import React, { useState } from 'react';
import Graph from './Graph';
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
  const [selected, setSelected] = useState([]);
  const [copied, setCopied] = useState([]);

  return (
    <div>
      <MenuBar json={json} setJson={setJson} selected={selected} copied={copied} setCopied={setCopied}></MenuBar>
      <Graph json={json} setSelected={setSelected}></Graph>
      <Inputs json={json} setJson={setJson}></Inputs>
    </div>
  );
};

export default App;
