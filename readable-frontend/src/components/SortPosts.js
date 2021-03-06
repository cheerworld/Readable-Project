import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  sortByVoteHigh,
  sortByVoteLow,
  sortByDateLatest,
  sortByDateOldest,
} from "../actions/posts";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";


function SortPosts(props) {
  const byVoteScoreHigh = () => {
    props.dispatch(sortByVoteHigh());
  };

  const byVoteScoreLow = () => {
    props.dispatch(sortByVoteLow());
  };

  const byDateLatest = () => {
    props.dispatch(sortByDateLatest());
  };

  const byDateOldest = () => {
    props.dispatch(sortByDateOldest());
  };

  return (
    <div className="sortButtons">
      <ButtonGroup className="mr-2" aria-label="zero group">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => props.history.push(`/createPost`)}
        >
          Create New Post
        </Button>
      </ButtonGroup>
      <ButtonGroup className="mr-2" aria-label="first group">
        <Button onClick={byVoteScoreHigh} variant="light">
          Vote from highest
        </Button>
      </ButtonGroup>
      <ButtonGroup className="mr-2" aria-label="second group">
        <Button onClick={byVoteScoreLow} variant="light">
          Vote from lowest
        </Button>
      </ButtonGroup>
      <ButtonGroup className="mr-2" aria-label="third group">
        <Button onClick={byDateLatest} variant="light">
          Date from latest
        </Button>
      </ButtonGroup>
      <ButtonGroup className="mr-2" aria-label="forth group">
        <Button onClick={byDateOldest} variant="light">
          Date from oldest
        </Button>
      </ButtonGroup>
    </div>
  );
}

SortPosts.propTypes = {
  dispatch: PropTypes.func,
};

export default withRouter(connect()(SortPosts));
