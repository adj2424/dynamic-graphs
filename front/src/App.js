/**
 * Project 2
 */
import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import ScatterPlot from './ScatterPlot';
import PieChart from './PieChart';
import Inputs from './Inputs';
import MenuBar from './MenuBar';
import Table from './Table';
const App = () => {
  //init data for placeholder
  const init = {
    title: '',
    data: [{ _: '', __: '' }]
  };

  //states
  const [json, setJson] = useState(init);
  const [selection, setSelection] = useState([]);
  const [copied, setCopied] = useState([]);

  useEffect(() => {
    //get data from server
    const getData = async () => {
      const url = `http://localhost:3001/data`;
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setJson(data[0]);
    };
    getData();
  }, []);

  return (
    <div>
      <MenuBar json={json} setJson={setJson} selection={selection} copied={copied} setCopied={setCopied}></MenuBar>
      <BarChart json={json} setSelection={setSelection} selection={selection} min={null} max={null} step={null} />
      <ScatterPlot json={json} setSelection={setSelection} selection={selection} min={null} max={null} step={null} />
      <PieChart json={json} setSelection={setSelection} selection={selection} min={null} max={null} step={null} />
      <Table json={json} setSelection={setSelection} selection={selection} />
      <Inputs json={json} setJson={setJson}></Inputs>
    </div>
  );
};

export default App;
