defmodule Events.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias NotQwerty123.PasswordStrength

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    has_many :posts, Events.Posts.Post, on_delete: :delete_all
    has_many :comments, Events.Comments.Comment
    has_many :invites, Events.Invites.Invite, foreign_key: :email, on_delete: :delete_all

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email])
    |> validate_password(attrs["password"])
    |> add_password_hash(attrs["password"])
    |> validate_required([:name, :email, :password_hash])
  end

  def add_password_hash(cset, nil) do
    cset
  end

  def add_password_hash(cset, password) do
    change(cset, Argon2.add_hash(password))
  end

  def validate_password(cset, nil) do
    cset
  end

  def validate_password(cset, password) do
    case PasswordStrength.strong_password?("pppp") do
      {:ok, password} -> cset
      {:error, message} -> add_error(cset, :password, message)
    end
  end
end
