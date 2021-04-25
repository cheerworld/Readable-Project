import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { generateId } from "../utils/api";
import { handleAddPost } from "../actions/posts";

function CreatePost(props) {
  const [title, onChangeTitle] = useState("");
  const [text, onChangeText] = useState("");
  const [name, onChangeName] = useState("");
  const [selectCategory, onChangeCategory] = useState("select");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(title, text, name, selectCategory);
    const newPost = {
      id: generateId(),
      timestamp: Date.now(),
      title,
      body: text,
      author: name,
      category: selectCategory,
    };
    props.dispatch(handleAddPost(newPost));

    onChangeText("");
    onChangeTitle("");
    onChangeName("");
    onChangeCategory("select");

    props.history.push("/");
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
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name here"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={selectCategory}
          onChange={(e) => onChangeCategory(e.target.value)}
        >
          <option disabled value="select" hidden>
            Select Category
          </option>
          {props.allCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={
          title === "" ||
          text === "" ||
          name === "" ||
          selectCategory === "select"
        }
      >
        Submit
      </Button>
    </Form>
  );
}

function mapStateToProps({ categories }) {
  const allCategory = categories.map((categoty) => categoty.name);
  console.log(allCategory);
  return {
    allCategory,
  };
}
export default connect(mapStateToProps)(CreatePost);
