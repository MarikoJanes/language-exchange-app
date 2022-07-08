class DropConversations < ActiveRecord::Migration[6.1]
  def change
    drop_table :conversations
  end
end
