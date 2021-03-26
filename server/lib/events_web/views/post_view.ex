defmodule EventsWeb.PostView do
  use EventsWeb, :view
  alias EventsWeb.PostView

  alias EventsWeb.UserView
  alias EventsWeb.CommentView
  alias EventsWeb.InviteView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post_view.json")}
  end

  def render("post.json", %{post: post}) do
    %{id: post.id,
      name: post.name,
      desc: post.desc,
      date: post.date,
      user: render_one(post.user, UserView, "user.json")}
  end

  def render("post_view.json", %{post: post}) do
    %{
      id: post.id,
      name: post.name,
      desc: post.desc,
      date: post.date,
      user: render_one(post.user, UserView, "user.json"),
      comments: render_many(post.comments, CommentView, "comment.json"),
      invites: render_many(post.invites, InviteView, "invite.json")
    }
  end
end
