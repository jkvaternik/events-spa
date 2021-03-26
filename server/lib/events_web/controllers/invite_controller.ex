defmodule EventsWeb.InviteController do
  use EventsWeb, :controller

  alias Events.Invites
  alias Events.Invites.Invite
  alias Events.Posts
  alias EventsWeb.Plugs

  action_fallback EventsWeb.FallbackController

  plug Plugs.RequireAuth when action in [:create, :update, :delete]

  def index(conn, _params) do
    invites = Invites.list_invites()
    render(conn, "index.json", invites: invites)
  end

  def format(invite) do
    %{"post_id" => invite["post_id"], "email" => invite["email"], "resp" => "haven't responded"}
  end

  def create(conn, %{"invite" => invite_params}) do
    user = conn.assigns[:current_user]
    post = invite_params
      |> Map.get("post_id")
      |> Posts.get_post!
      |> Posts.load_post

    invite_params = format(invite_params)

    if user.id == post.user_id do
      with {:ok, %Invite{} = invite} <- Invites.create_invite(invite_params) do
        IO.inspect(invite)
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.invite_path(conn, :show, invite))
        |> send_resp(:ok, Jason.encode!(%{}))
      end
    else
      conn
      |> send_resp(:unauthorized, Jason.encode!(%{error: "Not authorized"}))
    end
  end

  def show(conn, %{"id" => id}) do
    invite = Invites.get_invite!(id)
    render(conn, "show.json", invite: invite)
  end

  def update(conn,  %{"invite" => invite_params}) do
    user = conn.assigns[:current_user]

    IO.inspect(invite_params)

    post_id = invite_params["post_id"]

    invite = invite_params
      |> Map.get("post_id")
      |> Posts.get_post!
      |> Posts.load_post
      |> Map.get(:invites)
      |> Enum.find(fn inv -> inv.email == user.email end)

    invite_params = invite_params
      |> Map.put("email", invite.email)

    with {:ok, %Invite{} = invite} <- Invites.update_invite(invite, invite_params) do
      render(conn, "show.json", invite: invite)
    end
  end

  def delete(conn, %{"id" => id}) do
    invite = Invites.get_invite!(id)

    with {:ok, %Invite{}} <- Invites.delete_invite(invite) do
      send_resp(conn, :no_content, "")
    end
  end
end
