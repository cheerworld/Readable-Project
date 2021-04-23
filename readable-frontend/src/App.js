import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import { handleGetCategories } from "./actions/categories";

function App(props) {
  //const [count, onChangeCount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      
      //const posts = await getAllPosts()
      props.dispatch(handleGetCategories());

    }
    fetchData()
  }, [])

  return (
    <div className="App">

    </div>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(App);
