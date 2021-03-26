import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import PostCard from './Post/Card/PostCard.js';

const Feed = ({ posts, session }) => {
  let cards = posts.map((post) => {
    let op = null;
    if (session) {
      op = post.user.email === session.email;
    }
    return <PostCard op={op} post={post} key={post.id} />
  });



  let body = (
    <div>
      <Link to={'/posts/new'} className="btn btn-primary" style={{ width: '100%', marginBottom: '25px' }}>
        Create Event
      </Link>
      <Row>
        {cards}
      </Row>
    </div>
  )

  return session ? body : (<h5>Log in to continue</h5>)
}

export default connect(({ posts, session }) => ({ posts, session }))(Feed);