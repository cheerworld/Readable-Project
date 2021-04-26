import React, { useEffect } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import { formatDate } from "../utils/api";
import { handleDeletePost } from "../actions/posts";
import { Link, withRouter } from "react-router-dom";

function PostDetail(props) {
  if (props.newPost === null) {
    return <h1>No post found</h1>;
  }

  const { id, title, author, commentCount, time, voteScore } = props.newPost;

  const deleteButton = () => {
    props.dispatch(handleDeletePost(id));

    props.history.push(`/`);
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
        <p>
          <GoArrowUp />
          {voteScore} votes
          <GoArrowDown />
        </p>
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
