import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import { formatDate } from "../utils/api";
import { Link } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import Card from "react-bootstrap/Card";
import PropTypes from 'prop-types';

function PostBrief(props) {
  const { id, title, author, commentCount, time, voteScore } = props.newPost;
    
  return (
    <div className="listGroup">
      <Card className="votesForPost">
        <VoteButtons id={id}>{voteScore} votes</VoteButtons>
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

PostBrief.propTypes = {
  newPost: PropTypes.object,
  postId: PropTypes.string,
}

export default connect(mapStateToProps)(PostBrief);
