import React from 'react';
import { connect } from 'react-redux';

import { Card, Button } from 'react-bootstrap';
import { delete_comment } from '../../../api';

const Comments = ({ session, op, comments, updatePost }) => {

  function deleteHandler(id) {
    delete_comment(id).then((resp) => {
      updatePost();
    })
  }

  let comms = comments.map((comm) => {
    return (
      <Card key={comm.user.name + comm.id} style={{marginBottom: '10px'}}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Posted by {comm.user.name}
          </Card.Subtitle>
          <Card.Text>
            {comm.body}
          </Card.Text>
          {(op || session.email === comm.user.email) ? <Button
            onClick = {() => deleteHandler(comm.id)}
            variant="link"
            style={{ float: "right" }}>
            Delete
          </Button>: null}
        </Card.Body>
      </Card>
    )
  })

  return (
    comms.length !== 0 ? 
    <div>
      {comms}
    </div>
    :
    <Card>
      <Card.Body style={{backgroundColor: '#eeeeee'}}>
        <Card.Text className="text-center text-muted">
          No comments.
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default connect(({ session }) => ({ session }))(Comments);