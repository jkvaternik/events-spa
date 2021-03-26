defmodule Events.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :date, :utc_datetime
    field :desc, :string
    field :name, :string
    belongs_to :user, Events.Users.User
    has_many :comments, Events.Comments.Comment, on_delete: :delete_all
    has_many :invites, Events.Invites.Invite, on_delete: :delete_all

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:name, :desc, :date, :user_id])
    |> validate_required([:name, :desc, :date, :user_id])
  end
end
