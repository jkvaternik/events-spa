defmodule EventsWeb.PostController do
  use EventsWeb, :controller

  alias Events.Posts
  alias Events.Posts.Post
  alias EventsWeb.Plugs

  action_fallback(EventsWeb.FallbackController)

  plug Plugs.RequireAuth when action in [:create, :update, :delete]

  def index(conn, _params) do
    posts = Posts.list_posts()
    render(conn, "index.json", posts: posts)
  end

  def create(conn, %{"post" => post_params}) do
    user = conn.assigns[:current_user]

    {:ok, datetime, 0} = DateTime.from_iso8601(Map.get(post_params, "date"))

    post_params = post_params |> Map.put("user_id", user.id) |> Map.put("date", datetime)

    with {:ok, %Post{} = post} <- Posts.create_post(post_params) do
      post = post |> Posts.load_post

      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.post_path(conn, :show, post))
      |> render("show.json", post: post)
    end
  end

  def show(conn, %{"id" => id}) do
    post = Posts.get_post!(id) |> Posts.load_post
    render(conn, "show.json", post: post)
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    post = Posts.get_post!(id) |> Posts.load_post
    user = conn.assigns[:current_user]

    IO.inspect(user)

    if user.id == post.user_id do
      with {:ok, %Post{} = post} <- Posts.update_post(post, post_params) do
        render(conn, "show.json", post: post)
      end
    else
      conn
      |> send_resp(:unauthorized, Jason.encode!(%{"error" => "Only the owner can edit this."}))
    end
  end

  def delete(conn, %{"id" => id}) do
    post = Posts.get_post!(id)

    with {:ok, %Post{}} <- Posts.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end
end
