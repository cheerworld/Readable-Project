import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import PostList from "./components/PostList";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import CategoryPosts from "./components/CategoryPosts";
import PostView from "./components/PostView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "./actions/shared";
import ErrorPage404 from "./components/ErrorPage404";

function App(props) {
  const { dispatch } = props;

  useEffect(() => {
    async function fetchData() {
    dispatch(handleInitialData());
    }
    fetchData();
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={PostList} />
          <Route path="/createPost" exact component={CreatePost} />
          <Route path="/edit/:postId" exact component={CreatePost} />
          <Route path="/:name" exact component={CategoryPosts} />
          <Route path="/:name/:id" exact component={PostView} />
          <Route component={ErrorPage404} />
        </Switch>
        <footer>
          <p className="footerP">
            <span role="img" aria-label="Dog">
              🐶{" "}
            </span>
            Made by Yuguo Zhao
            <span role="img" aria-label="Cat">
              {" "}
              🐱
            </span>
          </p>
        </footer>
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
