import React from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/api";
import { Link } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import { handleDeletePost } from "../actions/posts";
import { withRouter } from "react-router-dom";

function PostBrief(props) {
  const { id, title, author, commentCount, time, voteScore, category } = props.newPost;

  const deleteButton = () => {
    props.dispatch(handleDeletePost(id));

    props.history.push(`/`);
  };

  return (
    <div className="listGroup">
      <Card className="votesForPost">
        <VoteButtons id={id}>{voteScore} votes</VoteButtons>
      </Card>

      <Card className="grow">
        <Card.Body className="postBrief" as={Link} to={`/${category}/${id}`}>
          <div className="row">
            <div className="marginAfterName">Posted by {author}</div>
            <div>{time}</div>
          </div>
          <h3>{title}</h3>
        </Card.Body>

        <Card.Footer className="bottomGroup">
          <div>{commentCount} comments</div>

          <button
            onClick={() => props.history.push(`/edit/${id}`)}
            className="postDetailButton"
          >
            <RiEdit2Fill />
            Edit
          </button>
          <button className="postDetailButton" onClick={deleteButton}>
            <RiDeleteBinFill />
            Delete
          </button>
        </Card.Footer>


      </Card>

    </div>
  );
}

function mapStateToProps({ posts }, { postId }) {
  const newPost = posts.filter((post) => post.id === postId);

  const { id, title, author, commentCount, timestamp, voteScore, category } = newPost[0];
  const time = formatDate(timestamp);

  return {
    newPost: {
      id,
      title,
      author,
      commentCount,
      time,
      voteScore,
      category,
    },
  };
}

PostBrief.propTypes = {
  newPost: PropTypes.object,
  postId: PropTypes.string,
};

export default withRouter(connect(mapStateToProps)(PostBrief));
