import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { handleGetCategories } from "./actions/categories";
import { handleGetPosts } from "./actions/posts";
import PostList from "./components/PostList";
import Header from "./components/Header";
import { getCategoryPosts } from "./utils/api";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Container from "react-bootstrap/Container";

function App(props) {
  //const [count, onChangeCount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      props.dispatch(handleGetCategories());
      props.dispatch(handleGetPosts());
      //getCategoryPosts("react");
    }
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div>
          <Route path="/" exact component={PostList} />
          <Route path="/:name" exact component={PostList} />
        </div>
      </div>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(App);
