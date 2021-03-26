import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { create_invite } from '../../../api';

const InviteForm = ({ postId, updatePost }) => {
  const [invite, setInvite] = useState({ post_id: postId, email: "" });

  function submitHandler(ev) {
    ev.preventDefault();
    create_invite(invite).then((resp) => {
      updatePost();
      setInvite({ ...invite, email: "" })
    })
  }

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Label>Invite friends:</Form.Label>
        <Form.Group>
          <Form.Control
            type="text"
            onChange={(ev) => setInvite({ ...invite, email: ev.target.value })}
            value={invite.email}
            placeholder="john.appleseed@gmail.com"
          />
        </Form.Group>
        <Button type="submit"> Invite </Button>
      </Form>
      <br></br>
      <h5>Event Link</h5>
      <p>{window.location.href}</p>
    </div>
  )
}

export default InviteForm;

