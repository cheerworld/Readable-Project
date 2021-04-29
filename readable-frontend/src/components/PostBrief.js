import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import { formatDate } from "../utils/api";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { handleVotePost } from "../actions/posts";

function PostBrief(props) {
  console.log(props.newPost);
  const [upVoteDisable, onChangeUpVoteDisable] = useState(false);
  const [downVoteDisable, onChangeDownVoteDisable] = useState(false);
  const [color, onChangeColor] = useState("black");
  const { id, title, author, commentCount, time, voteScore } = props.newPost;

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
    <div>
      <button
        className="postDetailButton"
        onClick={() => onClickUpVote(id)}
        disabled={upVoteDisable}
      >
        {upVoteDisable ? <GoArrowUp className="upArrow" /> : <GoArrowUp />}
      </button>
      <p style={{ color: color }}>{voteScore} votes</p>
      <button
        className="postDetailButton"
        onClick={() => onClickDownVote(id)}
        disabled={downVoteDisable}
      >
        {downVoteDisable ? (
          <GoArrowDown className="downArrow" />
        ) : (
          <GoArrowDown />
        )}
      </button>

      <ListGroup.Item as={Link} action to={`/posts/${id}`}>
        <div>
          <div>
            <p>Posted by {author}</p>
            <p>{time}</p>
          </div>
          <h3>{title}</h3>
          <p>{commentCount} comments</p>
        </div>
      </ListGroup.Item>
    </div>
  );
}

function mapStateToProps({ posts }, { postId }) {
  const newPost = posts.filter((post) => post.id === postId);

  const { id, title, author, commentCount, timestamp, voteScore } = newPost[0];
  const time = formatDate(timestamp);

  return {
    newPost: {
      id,
      title,
      author,
      commentCount,
      time,
      voteScore,
    },
  };
}

export default connect(mapStateToProps)(PostBrief);
