class RemoveConversationIdFromMessages < ActiveRecord::Migration[6.1]
  def change
    remove_column :messages, :conversation_id, :bigint
  end
end
