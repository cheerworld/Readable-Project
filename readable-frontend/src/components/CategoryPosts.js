import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PostBrief from "./PostBrief";
import SortPosts from "./SortPosts";

function CategoryPosts(props) {

  const { ids, history, name } = props;

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
    <div>
      {name ? <h2>{name}</h2> : null}
      <SortPosts />
      <ListGroup>
        {ids && ids.map((id) => <PostBrief key={id} postId={id} />)}
      </ListGroup>
    </div>
  );
}

function mapStateToProps({ posts }, props) {
  const { name } = props.match.params;

  const categoryPostsId = posts
    .filter((post) => post.category === name)
    .map((post) => {
      const { id } = post;
      return id;
    });

  return {
    ids: name ? categoryPostsId : null,
    name: name.charAt(0).toUpperCase() + name.slice(1),
  };
}

export default connect(mapStateToProps)(CategoryPosts);
