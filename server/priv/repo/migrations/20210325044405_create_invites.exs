defmodule Events.Repo.Migrations.CreateInvites do
  use Ecto.Migration

  def change do
    create table(:invites) do
      add :resp, :string, null: false, default: "haven't responded"
      add :email, :string, null: false
      add :post_id, references(:posts, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:invites, [:post_id])
  end
end
