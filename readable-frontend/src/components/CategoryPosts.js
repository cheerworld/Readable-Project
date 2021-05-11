import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import PostBrief from "./PostBrief";
import SortPosts from "./SortPosts";
import PropTypes from 'prop-types';
import ErrorPage404 from "./ErrorPage404";

function CategoryPosts(props) {

  const { ids, name } = props;

  if (ids.length === 0) {
    return <ErrorPage404 />;
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
    ids: categoryPostsId,
    name: name.charAt(0).toUpperCase() + name.slice(1),
  };
}

CategoryPosts.propTypes = {
  ids: PropTypes.array,
  name: PropTypes.string,
  history: PropTypes.object,
}


export default connect(mapStateToProps)(CategoryPosts);
