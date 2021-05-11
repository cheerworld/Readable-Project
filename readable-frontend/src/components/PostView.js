import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostDetail from "./PostDetail";
import CommentsList from "./CommentsList";
import { handleGetComments } from "../actions/comments";
import AddComment from "./AddComment";
import PropTypes from 'prop-types';
import ErrorPage404 from "./ErrorPage404";

function PostView(props) {
  const { id, dispatch, categoryExist, postExist } = props;

  useEffect(() => {
    function allComments() {

    dispatch(handleGetComments(id));

    };
    allComments();
  }, [dispatch, id]);

  if(!categoryExist || !postExist) {
    return <ErrorPage404 />
  }

  return (
    <div>
      <h2>Post View</h2>
      <PostDetail postId={id} />
      <AddComment postId={id} />
      <CommentsList postId={id} />
    </div>
  );
}

function mapStateToProps({ posts, categories }, props) {
  const { id, name } = props.match.params;
  const categoryExist = categories.some((category) => category.name === name)
  const postExist = posts.some(post => post.id === id)

  return {
    id,
    categoryExist,
    postExist,
  };
}

PostView.propTypes = {
  id: PropTypes.string,
  dispatch: PropTypes.func,
  categoryExist: PropTypes.bool,
  postExist: PropTypes.bool,
}

export default connect(mapStateToProps)(PostView);
