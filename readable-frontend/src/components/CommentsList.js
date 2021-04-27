import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCommentsFromServer } from "../utils/api";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import { formatDate } from "../utils/api";

function CommentsList(props) {
  const { commentsForPost } = props;

  if (!commentsForPost || commentsForPost.length === 0) {
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
        {commentsForPost.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <div>
              <div>
                <p>Posted by {comment.author}</p>
                <p>{comment.time}</p>
              </div>
              <h5>{comment.body}</h5>
              <p>
                <GoArrowUp />
                {comment.voteScore} votes
                <GoArrowDown />
              </p>
              <Button className="postDetailButton">
                <RiEdit2Fill />
                Edit
              </Button>
              <Button className="postDetailButton">
                <RiDeleteBinFill />
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

function mapStateToProps({ comments }, { postId }) {
  console.log(comments, postId);
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
      };
    });
  console.log(commentsForPost);
  return {
    commentsForPost,
  };
}

export default connect(mapStateToProps)(CommentsList);
