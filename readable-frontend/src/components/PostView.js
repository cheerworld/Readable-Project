import React, { useEffect } from "react";
import { connect } from "react-redux";

function PostView(props) {
  return (
    <h1>Post View</h1>
  )
}

function mapStateToProps({ posts }) {

}

export default connect(mapStateToProps)(PostView);
