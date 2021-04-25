import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CreatePost(props) {
  const [title, onChangeTitle] = useState("");
  const [text, onChangeText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    //if(title!==""){
    console.log(title, text);

    onChangeText("");
    onChangeTitle("");
    //}
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <h3>Create Post: </h3>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your title here"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Text(Optional)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your text here"
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={title === ""}>
        Submit
      </Button>
    </Form>
  );
}

function mapStateToProps() {}
export default connect(mapStateToProps)(CreatePost);
