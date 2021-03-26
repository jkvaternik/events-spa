defmodule EventsWeb.CommentController do
  use EventsWeb, :controller

  alias Events.Comments
  alias Events.Comments.Comment
  alias Events.Posts
  alias EventsWeb.Plugs

  plug Plugs.RequireAuth when action in [:create, :delete]

  action_fallback(EventsWeb.FallbackController)

  def index(conn, _params) do
    comments = Comments.list_comments()
    render(conn, "index.json", comments: comments)
  end

  def create(conn, %{"comment" => comment_params}) do
    IO.inspect(comment_params)

    user = conn.assigns[:current_user]

    post =
      comment_params
      |> Map.get("post_id")
      |> Posts.get_post!
      |> Posts.load_post

    if user.id == post.user_id || Enum.any?(post.invites, fn inv -> inv.email == user.email end) do
      comment_params =
        comment_params
        |> Map.put("user_id", user.id)

      IO.inspect(comment_params)

      with {:ok, %Comment{} = comment} <- Comments.create_comment(comment_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.comment_path(conn, :show, comment))
        |> send_resp(:ok, Jason.encode!(%{}))
      end
    else
      conn
      |> send_resp(:unauthorized, Jason.encode!(%{error: "Not authorized"}))
    end
  end

  def show(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)
    render(conn, "show.json", comment: comment)
  end

  def update(conn, %{"id" => id, "comment" => comment_params}) do
    comment = Comments.get_comment!(id)

    with {:ok, %Comment{} = comment} <- Comments.update_comment(comment, comment_params) do
      render(conn, "show.json", comment: comment)
    end
  end

  def delete(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)

    with {:ok, %Comment{}} <- Comments.delete_comment(comment) do
      send_resp(conn, :no_content, "")
    end
  end
end
