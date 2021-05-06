import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { handleVotePost } from "../actions/posts";
import { handleVoteComment } from "../actions/comments";

function VoteButtons(props) {
  const [upVoteDisable, onChangeUpVoteDisable] = useState(false);
  const [downVoteDisable, onChangeDownVoteDisable] = useState(false);
  const [color, onChangeColor] = useState("black");
  const { id } = props;

  useEffect(() => {
    async function getVoteValue() {
      try {
        if (id) {
          const value = await localStorage.getItem(id);

          if (value && value === "downVote") {
            onChangeDownVoteDisable(true);
            onChangeColor("#3ec1d3");
          }
          if (value && value === "upVote") {
            onChangeUpVoteDisable(true);
            onChangeColor("#ff165d");
          }
        }
      } catch (e) {
        console.warn("Error in getVoteValue:", e);
      }
    }

    getVoteValue();
  }, [id]);

  const onClickDownVote = (id) => {
    onChangeDownVoteDisable(true);
    onChangeColor("#3ec1d3");
    const option = {
      option: "downVote",
    };

    if (props.comment) {
      props.dispatch(handleVoteComment(id, option));
    } else {
      props.dispatch(handleVotePost(id, option));
    }

    onChangeUpVoteDisable(false);
  };

  const onClickUpVote = (id) => {
    onChangeUpVoteDisable(true);
    onChangeColor("#ff165d");
    const option = {
      option: "upVote",
    };

    if (props.comment) {
      props.dispatch(handleVoteComment(id, option));
    } else {
      props.dispatch(handleVotePost(id, option));
    }

    onChangeDownVoteDisable(false);
  };

  return (
    <Fragment>
      <Button
        variant="light"
        onClick={() => onClickUpVote(id)}
        disabled={upVoteDisable}
      >
        {upVoteDisable ? <GoArrowUp className="upArrow" /> : <GoArrowUp />}
      </Button>
      <Card.Text style={{ color: color, margin: props.comment ? 0 : 5 }}>
        {props.children}
      </Card.Text>

      <Button
        variant="light"
        onClick={() => onClickDownVote(id)}
        disabled={downVoteDisable}
      >
        {downVoteDisable ? (
          <GoArrowDown className="downArrow" />
        ) : (
          <GoArrowDown />
        )}
      </Button>
    </Fragment>
  );
}

export default connect()(VoteButtons);
