import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllCategory } from "./utils/api";

function App() {
  //const [count, onChangeCount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const categories = await getAllCategory()
      console.log(categories);
    }
    fetchData()
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
