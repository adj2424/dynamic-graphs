import React, { useState } from 'react';
import Graph from './Graph';
import Inputs from './Inputs';
import MenuBar from './MenuBar';
const App = () => {
  const init = {
    title: 'hi',
    data: [
      { year: '1950', population: 2.525 },
      { year: '1960', population: 3.018 },
      { year: '1970', population: 3.318 }
    ]
  };
  const [selected, setSelected] = useState([]);
  const [json, setJson] = useState(init);
  //const update = () => {};
  return (
    <div>
      <MenuBar selected={selected}></MenuBar>
      <Graph json={json} setSelected={setSelected}></Graph>
      <Inputs json={json} setJson={setJson}></Inputs>
    </div>
  );
};

export default App;
