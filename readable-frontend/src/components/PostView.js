import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostDetail from "./PostDetail";
import CommentsList from "./CommentsList";
import { handleGetComments } from "../actions/comments";
import AddComment from "./AddComment";

function PostView(props) {
  const { id, dispatch } = props;

  useEffect(() => {
    function allComments() {

    dispatch(handleGetComments(id));

    };
    allComments();
  }, [dispatch, id]);
  return (
    <div>
      <h1>Post View</h1>
      <PostDetail postId={id} />
      <AddComment postId={id} />
      <CommentsList postId={id} />
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
