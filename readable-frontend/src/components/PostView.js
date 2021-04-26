import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostDetail from "./PostDetail";

function PostView(props) {
  return (
    <div>
      <h1>Post View</h1>
      <PostDetail postId={props.id} />
    </div>
  );
}

function mapStateToProps({ posts }, props) {
  const { id } = props.match.params;
  return {
    id,
  };
}

export default connect(mapStateToProps)(PostView);
