defmodule EventsWeb.SessionController do
  use EventsWeb, :controller

  def create(conn, %{"email" => email, "password" => password}) do
    user = Events.Users.authenticate(email, password)

    if user do
      sess = %{
        user_id: user.id,
        email: user.email,
        name: user.name,
        token: Phoenix.Token.sign(conn, "user_id", user.id)
      }

      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(:created, Jason.encode!(%{session: sess}))
    else
      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(:unauthorized, Jason.encode!(%{error: "Failed to login"}))
    end
  end
end
