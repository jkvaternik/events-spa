defmodule Events.Invites.Invite do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invites" do
    field :email, :string
    field :resp, :string
    belongs_to :post, Events.Posts.Post

    timestamps()
  end

  @doc false
  def changeset(invite, attrs) do
    invite
    |> cast(attrs, [:resp, :email, :post_id])
    |> validate_required([:resp, :email, :post_id])
  end
end
