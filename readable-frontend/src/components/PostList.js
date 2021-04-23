import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";

import PostBrief from "./PostBrief";

function PostList(props) {
  console.log(props.ids);
  const { ids } = props;

  return (
    <ListGroup>
      {ids.map((id) => (
        <PostBrief key={id} postId={id} />
      ))}
    </ListGroup>
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
