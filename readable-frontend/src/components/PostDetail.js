import React, { useEffect } from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { formatDate } from "../utils/api";

function PostDetail(props) {
  if (props.newPost !== null) {
    console.log(props);
    const { id, title, author, commentCount, time, voteScore } = props.newPost;
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
        </div>
      </ListGroup.Item>
    );
  } else {
    return <h1>No post found</h1>;
  }
}

function mapStateToProps({ posts }, { postId }) {
  console.log(postId);
  const post = posts.filter((post) => post.id === postId);
  console.log(post);
  if (post.length !== 0) {
    const { id, title, author, commentCount, timestamp, voteScore } = post[0];
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
  } else {
    return { newPost: null };
  }
}

export default connect(mapStateToProps)(PostDetail);
