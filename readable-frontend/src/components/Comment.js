import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { RiDeleteBinFill } from "react-icons/ri";
import { handleDeleteComment } from "../actions/comments";
import EditComment from "./EditComment";
import { handleVoteComment } from "../actions/comments";

function Comment(props) {
  const [upVoteDisable, onChangeUpVoteDisable] = useState(false);
  const [downVoteDisable, onChangeDownVoteDisable] = useState(false);
  const [color, onChangeColor] = useState("black");

  const { comment } = props;

  useEffect(() => {
    function getVoteValue() {
      const value = localStorage.getItem(comment.id);
      console.log(value);
      if (value && value === "downVote") {
        onChangeDownVoteDisable(true);
        onChangeColor("#3ec1d3");
      }
      if (value && value === "upVote") {
        onChangeUpVoteDisable(true);
        onChangeColor("#ff165d");
      }
    }

    getVoteValue();
  }, [comment.id])

  const onClickUpVote = (id) => {
    onChangeUpVoteDisable(true);
    onChangeColor("#ff165d");
    const option = {
      option: "upVote",
    };

    props.dispatch(handleVoteComment(id, option));
    onChangeDownVoteDisable(false);
  };

  const onClickDownVote = (id) => {
    onChangeDownVoteDisable(true);
    onChangeColor("#3ec1d3");
    const option = {
      option: "downVote",
    };

    props.dispatch(handleVoteComment(id, option));
    onChangeUpVoteDisable(false);
  };

  const onClickDelete = (e, id) => {
    e.preventDefault();
    props.dispatch(handleDeleteComment(id));
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
        <button
          className="postDetailButton"
          onClick={() => onClickUpVote(comment.id)}
          disabled={upVoteDisable}
        >
          {upVoteDisable ? <GoArrowUp className="upArrow" /> : <GoArrowUp />}
        </button>
        <div style={{ color: color }}>{comment.voteScore} votes</div>

        <button
          className="postDetailButton"
          onClick={() => onClickDownVote(comment.id)}
          disabled={downVoteDisable}
        >
          {downVoteDisable ? (
            <GoArrowDown className="downArrow" />
          ) : (
            <GoArrowDown />
          )}
        </button>
        </div>
        <EditComment commentId={comment.id} postId={props.postId} />
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

function mapStateToProps({ comments }) {
  return {
    comments,
  };
}
export default connect(mapStateToProps)(Comment);
