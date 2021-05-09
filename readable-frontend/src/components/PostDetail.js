import React from "react";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import { formatDate } from "../utils/api";
import { handleDeletePost } from "../actions/posts";
import { withRouter } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

function PostDetail(props) {
  if (props.newPost === null) {
    return <h1>No post found</h1>;
  }

  const {
    id,
    title,
    author,
    commentCount,
    time,
    voteScore,
    body,
    category,
  } = props.newPost;

  const deleteButton = () => {
    props.dispatch(handleDeletePost(id));

    props.history.push(`/`);
  };

  return (
    <div className="listGroup center">
      <Card className="votesForPost">
        <VoteButtons id={id}>{voteScore} votes</VoteButtons>
      </Card>

      <ListGroup.Item className="postBrief grow">
        <div className="row">
          <button
            onClick={() => props.history.push(`/${category}`)}
            className="postDetailButton marginAfterName"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)} Category
          </button>
          <div className="marginAfterName">Posted by {author}</div>
          <div>{time}</div>
        </div>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="bottomGroup">
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
        </div>
      </ListGroup.Item>
    </div>
  );
}

function mapStateToProps({ posts }, { postId }) {
  const post = posts.filter((post) => post.id === postId);

  if (post.length !== 0) {
    const {
      id,
      title,
      author,
      commentCount,
      timestamp,
      voteScore,
      body,
      category,
    } = post[0];
    const time = formatDate(timestamp);
    return {
      newPost: {
        id,
        title,
        author,
        commentCount,
        time,
        voteScore,
        body,
        category,
      },
    };
  } else {
    return { newPost: null };
  }
}

PostDetail.propTypes = {
  postId: PropTypes.string,
  newPost: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(PostDetail));
