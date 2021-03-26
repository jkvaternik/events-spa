import React, { useState } from 'react';

import { Nav, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { api_login } from '../api';
import store from '../store';

const Link = ({ to, children }) => {
  return (
    <Nav.Item>
      <NavLink to={to} exact className="nav-link" activeClassName="active">
        {children}
      </NavLink>
    </Nav.Item>
  );
}

const SessionInfo = ({ session }) => {
  const history = useHistory()

  function logout(ev) {
    ev.preventDefault();
    store.dispatch({ type: 'session/clear' });
    history.push('/');
  }

  return (
    <div style={{ float: 'right' }}>
      <p style={{ display: 'inline-block', marginRight: '12px' }}>
        Logged in as {session.name}
      </p>
      <Button onClick={logout}>Logout</Button>
    </div>

  );
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const history = useHistory()

  function on_submit(ev) {
    ev.preventDefault();
    api_login(email, pass);
    history.push('/');
  }

  return (
    <div className="toolbar" style={{ float: 'right' }}>
      <Form onSubmit={on_submit} inline>
        <Form.Control name="email"
          type="text"
          onChange={(ev) => setEmail(ev.target.value)}
          value={email}
          placeholder="Email" />
        <Form.Control name="password"
          type="password"
          onChange={(ev) => setPass(ev.target.value)}
          value={pass}
          placeholder="Password" />
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="outline-primary">
          <Link style={{float: 'right'}} to={'/users/new'}>
            Register
          </Link>
        </Button>
      </Form>
    </div>


  );
}

function LOI({ session }) {
  if (session) {
    return <SessionInfo session={session} />;
  }
  else {
    return <LoginForm />;
  }
}

const LoginOrInfo = connect(
  ({ session }) => ({ session }))(LOI);

const Navigation = ({ error }) => {
  let error_row = null;

  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    )
  }

  return (
    <div>
      <Row>
        <Col>
          <Nav variant="pills">
            <Link to="/">Feed</Link>
            <Link to="/users">Users</Link>
          </Nav>
        </Col>
        <Col>
          <LoginOrInfo />
        </Col>
      </Row>
      { error_row}
    </div>

  )
}

export default connect(({ error }) => ({ error }))(Navigation);