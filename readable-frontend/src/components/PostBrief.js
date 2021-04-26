import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import { formatDate } from "../utils/api";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { Link } from "react-router-dom";


function PostBrief(props) {
  console.log(props.newPost);
  const { id, title, author, commentCount, time, voteScore } = props.newPost;

  return (
    <ListGroup.Item as={Link} action to={`/posts/${id}`}>
      <div>
        <div>
          <p>Posted by {author}</p>
          <p>{time}</p>
        </div>
        <h3>{title}</h3>
        <p>{commentCount} comments</p>
        <p><GoArrowUp/>{voteScore} votes<GoArrowDown/></p>
      </div>
    </ListGroup.Item>
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
