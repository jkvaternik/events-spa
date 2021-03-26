import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { create_post, fetch_post, update_post } from '../../api';

const PostForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const [post, setPost] = useState(
    {
      name: "",
      desc: "",
      date: new Date(),
    }
  )

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const formatDateString = (d, t) => {
    let result = `${d}T${t}:00`;
    return new Date(result);
  }

  useEffect(() => {
    if (id) {
      fetch_post(id).then((resp) => {
        setPost({
          ...resp,
          date: new Date(resp.date)
        })
        setDate(new Date(resp.date).toISOString().slice(0, 10));
        setTime(new Date(resp.date).toISOString().slice(11, -8));
      })
    }
  }, [id]);

  const submitHandler = (ev) => {
    ev.preventDefault();
    if (id) {
      update_post({...post, date: formatDateString(date, time).toISOString()}, id).then((resp) => {
        history.push(`/posts/${id}`)
      })
    }
    else {
      create_post({...post, date: formatDateString(date, time).toISOString()}).then((resp) => {
        history.push('/')
      });
    }
  }

  return (
    <div>
      <h1>{ id ? "Edit" : "Create"} Event</h1>
      <br/>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            value = {post.name}
            onChange = {(ev) => setPost({...post, name: ev.target.value})}
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                value = {date}
                onChange = {(ev) => setDate(ev.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Event Time</Form.Label>
              <Form.Control
                type="time"
                value = {time}
                onChange = {(ev) => setTime(ev.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Label>Event Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            value={post.desc}
            onChange = {(ev) => setPost({...post, desc: ev.target.value})}
          />
        </Form.Group>
        <br></br>
        <Button type="submit">Confirm</Button>
      </Form>
    </div>
  )
}

export default PostForm;