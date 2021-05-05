import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { generateId } from "../utils/api";
import { handleAddComment } from "../actions/comments";
import { addToCommentCount } from "../actions/posts";
import CommentModal from "./CommentModal";
import { RiEdit2Fill } from "react-icons/ri";
import { handleEditComment } from "../actions/comments";

function AddComment(props) {
  const [show, setShow] = useState(false);
  const [text, onChangeText] = useState("");
  const [name, onChangeName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    function editComment() {
      if (props.commentId && props.comment) {
        onChangeText(props.comment[0].body);
        onChangeName(props.comment[0].author);
      }
    }
    editComment();
  }, [props.comment, props.commentId]);

  const onAddSubmit = (e) => {
    e.preventDefault();

    onChangeText("");
    onChangeName("");
    const newComment = {
      id: generateId(),
      timestamp: Date.now(),
      body: text,
      author: name,
      parentId: props.postId,
    };

    props.dispatch(handleAddComment(newComment));
    props.dispatch(addToCommentCount(props.postId));
    handleClose();
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
    onChangeText("");
    onChangeName("");

    if (props.commentId && props.comment) {
      const editedComment = {
        id: props.commentId,
        timestamp: Date.now(),
        body: text,
        author: name,
      };
      props.dispatch(handleEditComment(editedComment));
    }

    handleClose();
  };

  return (
    <div>
      <CommentModal
        show={show}
        handleClose={handleClose}
        onSubmit={props.commentId ? onEditSubmit : onAddSubmit}
        text={text}
        onChangeText={(e) => onChangeText(e.target.value)}
        name={name}
        onChangeName={(e) => onChangeName(e.target.value)}
      >
        {props.commentId ? (
          <Button
            variant="light"
            className="postDetailButton"
            onClick={handleShow}
          >
            <RiEdit2Fill />
            Edit
          </Button>
        ) : (
          <Button
            className="addComment"
            variant="secondary"
            size="lg"
            onClick={handleShow}
          >
            Add New Comment
          </Button>
        )}
      </CommentModal>
    </div>
  );
}

function mapStateToProps({ comments }, { commentId, postId }) {
  const comment =
    postId && commentId
      ? comments[postId].filter((comment) => comment.id === commentId)
      : null;

  return {
    comment,
    commentId,
  };
}

export default connect(mapStateToProps)(AddComment);
