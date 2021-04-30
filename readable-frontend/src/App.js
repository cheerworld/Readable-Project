import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { handleGetCategories } from "./actions/categories";
import { handleGetPosts } from "./actions/posts";
import PostList from "./components/PostList";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import CategoryPosts from "./components/CategoryPosts";
import PostView from "./components/PostView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App(props) {
  const { dispatch } = props;

  useEffect(() => {
    async function fetchData() {
      dispatch(handleGetCategories());
      dispatch(handleGetPosts());
    }
    fetchData();
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={PostList} />
          <Route path="/categories/:name" component={CategoryPosts} />
          <Route path="/posts/:id" component={PostView} />
          <Route path="/createPost" component={CreatePost} />
          <Route path="/edit/:postId" component={CreatePost} />
        </Switch>
        <footer>
          <p className="footerP">
            <span role="img" aria-label="Tulip">
              🌷{" "}
            </span>
            Made by Yuguo Zhao
            <span role="img" aria-label="Hibiscus">
              {" "}
              🌺
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
