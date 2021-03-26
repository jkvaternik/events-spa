import React from 'react';

import { Col, Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { fetch_posts, delete_post } from '../../../api';

const PostCard = ({ op, post }) => {
  const history = useHistory()

  function deleteHandler(id) {
    delete_post(id).then((resp) => {
      fetch_posts();
      history.push('/');
    })
  }

  return (
    <Col className="col-sm-4" style={{ display: 'inline', marginBottom: '30px' }}>
      <Card>
        <Card.Body>
          <Card.Title>
            {post.name}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Posted by {post.user.name}
          </Card.Subtitle>
          <Card.Text>
            {post.desc}
          </Card.Text>
          {op ?
            <div>
              <Button
                onClick={() => deleteHandler(post.id)}
                variant="link"
                style={{ float: "right" }}>
                Delete
          </Button>
              <Link
                to={`/posts/${post.id}/edit`}
                className="btn btn-link"
                style={{ float: "right" }}>
                Edit
          </Link>
            </div> : null}
          <Link
            to={`/posts/${post.id}`}
            className="btn btn-link"
            style={{ float: "right" }}>
            View
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PostCard;