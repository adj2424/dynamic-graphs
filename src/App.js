import React, { useState } from 'react';
import Graph from './Graph';
import Inputs from './Inputs';
const App = () => {
  const init = {
    title: 'hi',
    data: [
      { year: '1950', population: 2.525 },
      { year: '1960', population: 3.018 },
      { year: '19601', population: 31 }
    ]
  };
  const [json, setJson] = useState(init);
  //const update = () => {};
  return (
    <div>
      <Graph json={json}></Graph>
      <Inputs json={json} setJson={setJson}></Inputs>
    </div>
  );
};

export default App;
