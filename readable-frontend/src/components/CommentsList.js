import React, { useEffect } from "react";
import { connect } from "react-redux";


function CommentsList(props) {
  return (
    <div>
      <h1>CommentsList</h1>
    </div>
  );
}

function mapStateToProps({ posts }, props) {
  const { id } = props.match.params;
  return {
    id,
  };
}

export default connect(mapStateToProps)(CommentsList);
