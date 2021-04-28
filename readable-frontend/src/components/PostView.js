import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostDetail from "./PostDetail";
import CommentsList from "./CommentsList";
import { handleGetComments } from "../actions/comments";
import AddComment from "./AddComment";

function PostView(props) {
  useEffect(() => {
    const allComments = async () => {
      try {
        props.dispatch(handleGetComments(props.id));
      } catch (e) {
        console.warn("Problem getting comments: ", e);
      }
    };
    allComments();
  }, []);
  return (
    <div>
      <h1>Post View</h1>
      <PostDetail postId={props.id} />
      <AddComment postId={props.id} />
      <CommentsList postId={props.id} />
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
