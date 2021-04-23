import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { handleGetCategories } from "./actions/categories";
import { handleGetPosts } from "./actions/posts";
import PostList from "./components/PostList";

function App(props) {
  //const [count, onChangeCount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      //const posts = await getAllPosts()
      props.dispatch(handleGetCategories());
      props.dispatch(handleGetPosts());
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <PostList />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(App);
