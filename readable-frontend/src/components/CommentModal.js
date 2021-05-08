import React, { Fragment } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from 'prop-types';

function CommentModal(props) {
  const {
    show,
    handleClose,
    onSubmit,
    text,
    onChangeText,
    name,
    onChangeName,
  } = props;

  return (
    <Fragment>
      {props.children}
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
                onChange={onChangeText}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name here"
                value={name}
                onChange={onChangeName}
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
    </Fragment>
  );
}

CommentModal.propTypes = {
  children: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  onSubmit: PropTypes.func,
  text: PropTypes.string,
  onChangeText: PropTypes.func,
  name: PropTypes.string,
  onChangeName: PropTypes.func,
  dispatch: PropTypes.func,
}

export default connect()(CommentModal);
