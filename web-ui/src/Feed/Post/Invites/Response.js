import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { update_invite } from '../../../api';

const InviteResponse = ({postId, updatePost, resp}) => {
  const [invite, setInvite] = useState({ post_id: postId, resp: resp })

  function submitHandler(ev) {
    console.log(invite)
    ev.preventDefault();
    update_invite(invite).then(() => {
      updatePost();
    });
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Label>My RSVP</Form.Label>
      <Form.Group>
        <Form.Control as="select"
          value={invite.resp}
          onChange={(ev) => setInvite({...invite, resp: ev.target.value})}
          placeholder="---">
          <option value="" disabled>Select your option</option>
          <option value="Maybe">Maybe</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Form.Control>
      </Form.Group>
      <Button style={{width: '100%'}} type="submit"> RSVP </Button>
    </Form>
  )
}

export default InviteResponse;