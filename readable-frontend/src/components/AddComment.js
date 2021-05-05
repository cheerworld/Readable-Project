import React, { useState } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { generateId } from "../utils/api";
import { handleAddComment } from "../actions/comments";
import { addToCommentCount } from "../actions/posts";

function AddComment(props) {
  const [show, setShow] = useState(false);
  const [text, onChangeText] = useState("");
  const [name, onChangeName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = (e) => {
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

  return (
    <div className="addComment">
      <Button variant="secondary" size="lg" onClick={handleShow}>
        Add New Comment
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

export default connect()(AddComment);
