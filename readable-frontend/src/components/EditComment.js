import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { RiEdit2Fill } from "react-icons/ri";
import { handleEditComment } from "../actions/comments";

function EditComment(props) {
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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(text, name);
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
      <Button className="postDetailButton" onClick={handleShow}>
        <RiEdit2Fill />
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comment:</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your comment here"
                value={text}
                onChange={(e) => onChangeText(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name here"
                value={name}
                onChange={(e) => onChangeName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={text === "" || name === ""}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

function mapStateToProps({ comments }, { commentId, postId }) {
  const comment = comments[postId].filter(
    (comment) => comment.id === commentId
  );
  console.log(comment, commentId);
  return {
    comment,
    commentId,
  };
}

export default connect(mapStateToProps)(EditComment);
