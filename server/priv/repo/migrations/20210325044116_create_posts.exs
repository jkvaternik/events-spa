defmodule Events.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :name, :string, null: false
      add :desc, :text, null: false
      add :date, :utc_datetime, null: false
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:posts, [:user_id])
  end
end
