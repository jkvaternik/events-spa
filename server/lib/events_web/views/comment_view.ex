defmodule EventsWeb.CommentView do
  use EventsWeb, :view
  alias EventsWeb.CommentView

  alias EventsWeb.UserView

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{id: comment.id,
      body: comment.body,
      user: render_one(comment.user, UserView, "user.json")}
  end
end
