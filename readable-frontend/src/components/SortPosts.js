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
    <div>
      <ButtonGroup className="mr-2" aria-label="first group">
        <Button onClick={byVoteScoreHigh} variant="info">
          Vote from highest
        </Button>
      </ButtonGroup>
      <ButtonGroup className="mr-2" aria-label="second group">
        <Button onClick={byVoteScoreLow} variant="info">
          Vote from lowest
        </Button>
      </ButtonGroup>
      <ButtonGroup className="mr-2" aria-label="third group">
        <Button onClick={byDateLatest} variant="info">
          Date from latest
        </Button>
      </ButtonGroup>
      <ButtonGroup className="mr-2" aria-label="forth group">
        <Button onClick={byDateOldest} variant="info">
          Date from oldest
        </Button>
      </ButtonGroup>
    </div>
  );
}

function mapStateToProps({ posts }) {
  return {
    posts,
  };
}

export default connect(mapStateToProps)(SortPosts);
