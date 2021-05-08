import React from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { RiDeleteBinFill } from "react-icons/ri";
import { handleDeleteComment } from "../actions/comments";
import AddComment from "./AddComment";
import { deductToCommentCount } from "../actions/posts";
import VoteButtons from "./VoteButtons";
import PropTypes from 'prop-types';

function Comment(props) {
  const { comment, postId, dispatch } = props;

  const onClickDelete = (e, id) => {
    e.preventDefault();
    dispatch(handleDeleteComment(id));
    dispatch(deductToCommentCount(postId));
  };

  return (
    <ListGroup.Item className="postBrief">
      <div className="row">
        <p className="marginAfterName">Posted by {comment.author}</p>
        <p>{comment.time}</p>
      </div>
      <h4>{comment.body}</h4>
      <div className="bottomGroup">
        <div className="votesGroup">
          <VoteButtons id={comment.id} comment={true}>
            {comment.voteScore} votes
          </VoteButtons>
        </div>
        <AddComment commentId={comment.id} postId={props.postId} />
        <Button
          variant="light"
          className="postDetailButton"
          onClick={(e) => onClickDelete(e, comment.id)}
        >
          <RiDeleteBinFill />
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.string,
  dispatch: PropTypes.func,
}

export default connect()(Comment);
