import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import { formatDate } from "../utils/api";

function PostBrief(props) {
  console.log(props.newPost);
  const { title, author, commentCount, time, voteScore } = props.newPost;
  return (
    <ListGroup.Item action>
      <div>
        <div>
          <p>Posted by {author}</p>
          <p>{time}</p>
        </div>
        <h3>{title}</h3>
        <p>{commentCount} comments</p>
        <p>{voteScore} votes</p>
      </div>
    </ListGroup.Item>
  );
}

function mapStateToProps({ posts }, { postId }) {
  const newPost = posts.filter((post) => post.id === postId);

  const { title, author, commentCount, timestamp, voteScore } = newPost[0];
  const time = formatDate(timestamp);
  console.log(newPost);
  return {
    newPost: {
      title,
      author,
      commentCount,
      time,
      voteScore,
    },
  };
}

export default connect(mapStateToProps)(PostBrief);
