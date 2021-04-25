import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PostBrief from "./PostBrief";

function CategoryPosts(props) {
  console.log(props);
  const { ids, history } = props;

  const home = () => {
    history.push("/");
  };

  if (ids.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>No Post Show</Card.Title>
          <Card.Text>
            There is no post show in this category, please click the button
            below to navigates to home view.
          </Card.Text>
          <Button variant="primary" onClick={home}>
            Home
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <ListGroup>
      {ids && ids.map((id) => (
        <PostBrief key={id} postId={id} />
      ))}
    </ListGroup>
  );
}

function mapStateToProps({ posts }, props) {
  const { name } = props.match.params;
  console.log(name);

  const categoryPostsId = posts
      .filter((post) => post.category === name)
      .map((post) => {
        const { id } = post;
        return id;
      });
    console.log(categoryPostsId);

  return {
    ids: name ? categoryPostsId : null,
  };
}

export default connect(mapStateToProps)(CategoryPosts);
