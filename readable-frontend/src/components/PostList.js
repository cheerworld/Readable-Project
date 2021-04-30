import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import PostBrief from "./PostBrief";
import SortPosts from "./SortPosts";

function PostList(props) {
  console.log(props);
  const { ids } = props;

  if (ids.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Title as="h1">Loading...</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <SortPosts />
      <ListGroup>
        {ids && ids.map((id) => <PostBrief key={id} postId={id} />)}
      </ListGroup>
    </div>
  );
}

function mapStateToProps({ posts }) {
  const ids = posts.map((post) => {
    const { id } = post;
    return id;
  });
  return {
    ids,
  };
}

export default connect(mapStateToProps)(PostList);
