import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import { formatDate } from "../utils/api";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { handleVotePost } from "../actions/posts";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function PostBrief(props) {
  const [upVoteDisable, onChangeUpVoteDisable] = useState(false);
  const [downVoteDisable, onChangeDownVoteDisable] = useState(false);
  const [color, onChangeColor] = useState("black");
  const { id, title, author, commentCount, time, voteScore } = props.newPost;

  useEffect(() => {
    async function getVoteValue() {
      try {
        const value = await localStorage.getItem(id);

        if (value && value === "downVote") {
          onChangeDownVoteDisable(true);
          onChangeColor("#3ec1d3");
        }
        if (value && value === "upVote") {
          onChangeUpVoteDisable(true);
          onChangeColor("#ff165d");
        }
      } catch (e) {
        console.warn("Error in getVoteValue in PostBrief.js:", e);
      }
    }

    getVoteValue();
  }, [id]);

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
    <div className="listGroup">
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

      <ListGroup.Item as={Link} action to={`/posts/${id}`}>
        <div className="postBrief">
          <div className="row">
            <div className="marginAfterName">Posted by {author}</div>
            <div>{time}</div>
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
