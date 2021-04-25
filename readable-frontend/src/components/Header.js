import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { withRouter } from "react-router-dom";

function Header(props) {
  console.log(props);
  const { names, history } = props;

  const toCategory = (e, name) => {
    history.push(`/posts/${name}`);
  };

  const createPost = () => {
    history.push(`/createPost`);
  }

  const toHome = () => {
    history.push(`/`);
  }

  return (
    <Navbar bg="light" expand="lg" className="nav">
      <Navbar.Brand>Readable</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav variant="pills" className="mr-auto">
          <Nav.Link onClick={toHome}>Home</Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            {names.map((name) => (
              <NavDropdown.Item key={name} onClick={(e) => toCategory(e, name)}>
                {name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <Nav.Link onClick={createPost}>Create Post</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function mapStateToProps({ categories }) {
  const names = categories.map((category) => category.name);
  //console.log(names)
  return {
    names,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
