import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import pick from 'lodash/pick';

import { create_user, fetch_user, fetch_users, update_user } from '../api';

const UserForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    pass1: "",
    pass2: ""
  });

  useEffect(() => {
    if (id) {
      fetch_user(id).then((resp) => {
        setUser({
          ...user,
          name: resp.name,
          email: resp.email
        })
      })
    }
  }, [id, user])

  function submitHandler(ev) {
    ev.preventDefault()

    let data = pick(user, ['name', 'email', 'password']);

    if (id) {
      update_user(data, id).then(() => {
        fetch_users();
        history.push('/users');
      })
    }
    else {
      create_user(data).then(() => {
        fetch_users();
        history.push('/users');
      });
    }
  }

  const check_pass = (p1, p2) => {
    if (p1 !== p2) {
      return "Passwords don't match.";
    }
    if (p1.length < 8) {
      return "Password is too short.";
    }

    return "";
  }

  const update = (field, ev) => {
    let tempUser = Object.assign({}, user);
    tempUser[field] = ev.target.value;
    tempUser.password = tempUser.pass1;
    tempUser.pass_msg = check_pass(tempUser.pass1, tempUser.pass2)
    setUser(tempUser)
  }

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={user.name}
            onChange={(ev) => update("name", ev)}
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={user.email}
            onChange={(ev) => update("email", ev)}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
            onChange={
              (ev) => update("pass1", ev)}
            value={user.pass1} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password"
            onChange={
              (ev) => update("pass2", ev)}
            value={user.pass2} />
          <p>{user.pass_msg}</p>
        </Form.Group>
        <Button variant="primary" type="submit"
          disabled={user.pass_msg !== ""}>
          Save
      </Button>
      </Form>
    </div>
  )
}

function state2props(_state) {
  return {};
}

export default connect(state2props)(UserForm);