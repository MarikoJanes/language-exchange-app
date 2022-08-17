class AddChatroomToMessages < ActiveRecord::Migration[6.1]
  def change

    add_reference :messages, :chatroom, foreign_key: true
  end
end
