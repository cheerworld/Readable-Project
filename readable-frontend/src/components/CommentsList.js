import React from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { formatDate } from "../utils/api";
import Comment from "./Comment";
import PropTypes from 'prop-types';

function CommentsList(props) {
  const { sortedComments } = props;

  if (!sortedComments || sortedComments.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Title as="h3">No Comments Found For This Post</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <h2>Comments List</h2>
      <ListGroup>
        {sortedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} postId={props.postId} />
        ))}
      </ListGroup>
    </div>
  );
}

function mapStateToProps({ comments }, { postId }) {

  const commentsForPost =
    comments[postId] &&
    comments[postId].map((comment) => {
      const { author, body, id, timestamp, voteScore } = comment;
      const time = formatDate(timestamp);
      return {
        author,
        body,
        id,
        time,
        voteScore,
        timestamp,
      };
    });

  return {
    sortedComments: commentsForPost ? commentsForPost.sort(( a, b ) => b.timestamp - a.timestamp) : null,
  };
}

CommentsList.propTypes = {
  sortedComments: PropTypes.array,
  postId: PropTypes.string,
}

export default connect(mapStateToProps)(CommentsList);
