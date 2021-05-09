import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import PostBrief from "./PostBrief";
import SortPosts from "./SortPosts";
import PropTypes from 'prop-types';

function PostList(props) {

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
      <h2>Home View</h2>
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

PostList.propTypes = {
  ids: PropTypes.array,
}

export default connect(mapStateToProps)(PostList);
