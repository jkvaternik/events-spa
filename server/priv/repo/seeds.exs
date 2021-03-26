# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Events.Repo.insert!(%Events.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Events.Repo
alias Events.Users.User
alias Events.Posts.Post

defmodule Inject do
  def user(name, email, pass) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end
end

adam = Inject.user("adam", "adam@gmail.com", "test1")
bella = Inject.user("bella", "bella@gmail.com", "test2")

{:ok, datetime, 0} = DateTime.from_iso8601("2022-01-23T23:50:07Z")

Repo.insert!(%Post{user_id: adam.id, name: "Adam's Birthday Party", desc: "There will be cake!", date: datetime})
Repo.insert!(%Post{user_id: bella.id, name: "Bella's Baby Shower", desc: "It's a girl!", date: datetime})
