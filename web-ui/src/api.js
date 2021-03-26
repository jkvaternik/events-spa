import store from './store';

async function api_get(path) {
  let text = await fetch("http://localhost:4000/api/v1" + path, {});
    let resp = await text.json();
    return resp.data;
}

async function api_post(path, data) {
  let state = store.getState();
  let token = state?.session?.token;

  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token
    },
    body: JSON.stringify(data),
  };

  let text = await fetch(
    "http://localhost:4000/api/v1" + path, opts);
  return await text.json();
}

async function api_patch(path, data) {
  let state = store.getState();
  let token = state?.session?.token;

  let opts = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token
    },
    body: JSON.stringify(data),
  };
  let text = await fetch(
    "http://localhost:4000/api/v1" + path, opts);
  return await text.json();
}

async function api_delete(path, data) {
  let state = store.getState();
  let token = state?.session?.token;

  let opts = {
    method: 'DELETE',
    headers: {
      'x-auth': token
    }
  };
  
  return await fetch(
    "http://localhost:4000/api/v1" + path, opts);
}

export function fetch_users() {
    api_get("/users").then((data) => store.dispatch({
        type: 'users/set',
        data: data,
    }));
}

export function fetch_user(id) {
  return api_get(`/users/${id}`);
}

export function create_user(user) {
  return api_post("/users", {user});
}

export function update_user(user, id) {
  return api_patch(`/users/${id}`, {user: user})
}

export function fetch_posts() {
  api_get("/posts").then((data) => store.dispatch({
    type: 'posts/set',
    data: data,
  }));
}

export function fetch_post(id) {
  return api_get(`/posts/${id}`);
}

export function create_post(post) {
  return api_post("/posts", {post: post});
}

export function update_post(post, id) {
  return api_patch(`/posts/${id}`, {post: post});
}

export function delete_post(id) {
  return api_delete(`/posts/${id}`);
}

export function create_comment(comment) {
  return api_post("/comments", {comment: comment});
}

export function delete_comment(id) {
  return api_delete(`/comments/${id}`);
}

export function create_invite(invite) {
  return api_post("/invites", {invite: invite});
}

export function update_invite(invite) {
  return api_patch("/invites/1", {invite: invite});
}

export function api_login(email, password) {
  api_post("/session", {email, password}).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: 'session/set',
        data: data.session,
      }
      store.dispatch(action);
    }
    else if (data.error) {
      let action = {
        type: 'error/set',
        data: data.error,
      };
      store.dispatch(action);
    }
  });
}

export function load_defaults() {
    fetch_users();
    fetch_posts();
}