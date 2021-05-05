import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import { formatDate } from "../utils/api";
import { handleDeletePost, handleVotePost } from "../actions/posts";
import { withRouter } from "react-router-dom";

function PostDetail(props) {
  const [upVoteDisable, onChangeUpVoteDisable] = useState(false);
  const [downVoteDisable, onChangeDownVoteDisable] = useState(false);
  const [color, onChangeColor] = useState("black");

  useEffect(() => {
    async function getVoteValue() {
      try {
        if (props.newPost !== null) {
          const value = await localStorage.getItem(props.newPost.id);

          if (value && value === "downVote") {
            onChangeDownVoteDisable(true);
            onChangeColor("#3ec1d3");
          }
          if (value && value === "upVote") {
            onChangeUpVoteDisable(true);
            onChangeColor("#ff165d");
          }
        }
      } catch (e) {
        console.warn("Error in getVoteValue:", e);
      }
    }

    getVoteValue();
  });

  if (props.newPost === null) {
    return <h1>No post found</h1>;
  }

  const { id, title, author, commentCount, time, voteScore } = props.newPost;

  const deleteButton = () => {
    props.dispatch(handleDeletePost(id));

    props.history.push(`/`);
  };

  const onClickDownVote = (id) => {
    onChangeDownVoteDisable(true);
    onChangeColor("#3ec1d3");
    const option = {
      option: "downVote",
    };

    props.dispatch(handleVotePost(id, option));
    onChangeUpVoteDisable(false);
  };

  const onClickUpVote = (id) => {
    onChangeUpVoteDisable(true);
    onChangeColor("#ff165d");
    const option = {
      option: "upVote",
    };

    props.dispatch(handleVotePost(id, option));
    onChangeDownVoteDisable(false);
  };

  return (
    <div className="listGroup center">
      <Card className="votesForPost">
        <Button
          variant="light"
          onClick={() => onClickUpVote(id)}
          disabled={upVoteDisable}
        >
          {upVoteDisable ? <GoArrowUp className="upArrow" /> : <GoArrowUp />}
        </Button>
        <Card.Text style={{ color: color }}>{voteScore} votes</Card.Text>

        <Button
          variant="light"
          onClick={() => onClickDownVote(id)}
          disabled={downVoteDisable}
        >
          {downVoteDisable ? (
            <GoArrowDown className="downArrow" />
          ) : (
            <GoArrowDown />
          )}
        </Button>
      </Card>

      <ListGroup.Item className="postBrief grow">
        <div className="row">
          <div className="marginAfterName">Posted by {author}</div>
          <div>{time}</div>
        </div>
        <h3>{title}</h3>
        <div className="bottomGroup">
          <div>{commentCount} comments</div>

          <button
            onClick={() => props.history.push(`/edit/${id}`)}
            className="postDetailButton"
          >
            <RiEdit2Fill />
            Edit
          </button>
          <button className="postDetailButton" onClick={deleteButton}>
            <RiDeleteBinFill />
            Delete
          </button>
        </div>
      </ListGroup.Item>
    </div>
  );
}

function mapStateToProps({ posts }, { postId }) {
  const post = posts.filter((post) => post.id === postId);

  if (post.length !== 0) {
    const { id, title, author, commentCount, timestamp, voteScore } = post[0];
    const time = formatDate(timestamp);
    return {
      posts,
      newPost: {
        id,
        title,
        author,
        commentCount,
        time,
        voteScore,
      },
    };
  } else {
    return { newPost: null };
  }
}

export default withRouter(connect(mapStateToProps)(PostDetail));
