import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import Users from './Users/Users';
import UserForm from './Users/UserForm';
import Feed from './Feed/Feed';
import Post from './Feed/Post/Post';
import PostForm from './Feed/Post/PostForm';
import Navigation from "./Navigation/Navigation";

import './App.scss';

function App() {
  return (
    <Container style={{paddingTop: '50px'}}>
      <Navigation />
      <br />
      <Switch>
        <Route path="/" exact>
          <Feed />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/users/new" >
          <UserForm />
        </Route>
        <Route path="/users/:id/edit" >
          <UserForm />
        </Route>
        <Route path="/posts/new">
          <PostForm />
        </Route>
        <Route path="/posts/:id/edit" exact>
          <PostForm />
        </Route>
        <Route path="/posts/:id" exact>
          <Post />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
