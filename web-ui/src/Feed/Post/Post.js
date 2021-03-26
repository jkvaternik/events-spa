import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetch_post } from '../../api';

import Comments from './Comments/Comments';
import CommentForm from './Comments/CommentForm';
import Invites from './Invites/Invites';
import InviteForm from './Invites/InviteForm';
import InviteResponse from './Invites/Response';

const Post = ({ session }) => {
  const { id } = useParams();

  const [post, setPost] = useState(
    {
      name: "",
      desc: "",
      date: new Date(),
      invites: [],
      comments: [],
      user: { name: "", email: "" }
    }
  )

  let op = null;
  let invited = null;

  if (session) {
    op = post.user.email === session.email;
    invited = post.invites.some(inv => inv.email === session.email);
  }
  
 

  const updatePost = () => {
    fetch_post(id).then((resp) => {
      console.log("Response", resp)
      setPost({
        ...resp,
        date: new Date(resp.date)
      });
    });
  }

  useEffect(() => {
    fetch_post(id).then((resp) => {
      console.log("Response", resp)
      setPost({
        ...resp,
        date: new Date(resp.date)
      })
    })
  }, [id]);

  return (op || invited) ? 
    (<div>
      <h1>{post.name}</h1>
      <h6 className="text-muted">{post.date.toLocaleString()}</h6>
      <p>Created by {post.user.name}</p>
      <div>
        <h5>Description</h5>
        <p>{post.desc}</p>
      </div>
      <hr></hr>
      <Row>
        <Col>
          <h4>Guests</h4>
          {op ?
            <InviteForm postId={id} updatePost={updatePost} /> :
            <InviteResponse postId={id} updatePost={updatePost} />}
          <br />
          <Invites invites={post.invites} />
        </Col>
        <Col>
          <h4>Comments</h4>
          <CommentForm postId={id} updatePost={updatePost} />
          <br />
          <Comments op={op} comments={post.comments} updatePost={updatePost}/>
        </Col>
      </Row>
    </div>)
    : 
    <h4>You must be logged in or invited to view this event. Please contact the owner to invite you.</h4>
  
}

export default connect(({ session }) => ({ session }))(Post);