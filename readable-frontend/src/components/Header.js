import React from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { withRouter } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import PropTypes from 'prop-types';

function Header(props) {

  const { names, history } = props;

  const toCategory = (e, name) => {
    history.push(`/categories/${name}`);
  };

  const createPost = () => {
    history.push(`/createPost`);
  };

  const toHome = () => {
    history.push(`/`);
  };

  return (
    <Navbar bg="dark" expand="lg" className="nav navBar" variant="dark">
      <Navbar.Brand>Readable</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav variant="pills" className="mr-auto">
          <Nav.Link onClick={toHome}>Home</Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown" variant="secondary">
            {names.map((name) => (
              <NavDropdown.Item key={name} onClick={(e) => toCategory(e, name)}>
                {name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link onClick={createPost}>Create Post <IoMdAdd/></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function mapStateToProps({ categories }) {
  const names = categories.map((category) => category.name);

  return {
    names,
  };
}

Header.propTypes = {
  history: PropTypes.object,
  names: PropTypes.array,
}

export default withRouter(connect(mapStateToProps)(Header));
