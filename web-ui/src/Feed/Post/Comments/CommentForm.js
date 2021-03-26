import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { create_comment } from '../../../api';

const CommentForm = ({ postId, updatePost }) => {
  const [comment, setComment] = useState({ post_id: postId, body: ""});

  function submitHandler(ev) {
    ev.preventDefault();
    create_comment(comment).then((resp) => {
      updatePost();
      setComment({...comment, body: ""});
    });
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>Add a comment:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          type="text"
          onChange={(ev) => setComment({...comment, body: ev.target.value})}
          value={comment.body}
          placeholder="Sounds great!"
        />
      </Form.Group>
      <Button style={{width: '100%'}} type="submit"> Comment </Button>
    </Form>
  )
}

export default CommentForm;