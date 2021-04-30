import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
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
    function getVoteValue() {
      if (props.newPost !== null) {
        const value = localStorage.getItem(props.newPost.id);
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
    }
    window.addEventListener("storage", getVoteValue);


    return () => {
      window.removeEventListener("storage", getVoteValue)
    }
  }, [props.newPost])

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
    <ListGroup.Item>
      <div>
        <div>
          <p>Posted by {author}</p>
          <p>{time}</p>
        </div>
        <h3>{title}</h3>
        <p>{commentCount} comments</p>
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
        </div>
        <Button
          onClick={() => props.history.push(`/edit/${id}`)}
          className="postDetailButton"
        >
          <RiEdit2Fill />
          Edit
        </Button>
        <Button className="postDetailButton" onClick={deleteButton}>
          <RiDeleteBinFill />
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}

function mapStateToProps({ posts }, { postId }) {
  //console.log(postId);
  const post = posts.filter((post) => post.id === postId);
  //console.log(post);
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
