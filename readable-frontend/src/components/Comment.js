import React from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { RiDeleteBinFill } from "react-icons/ri";
import { handleDeleteComment } from "../actions/comments";
import AddComment from "./AddComment";
import { deductToCommentCount } from "../actions/posts";
import VoteButtons from "./VoteButtons";

function Comment(props) {
  const { comment, postId } = props;

  const onClickDelete = (e, id) => {
    e.preventDefault();
    props.dispatch(handleDeleteComment(id));
    props.dispatch(deductToCommentCount(postId));
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

export default connect()(Comment);
