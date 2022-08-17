class AddLastReadAtToChatrooms < ActiveRecord::Migration[6.1]
  def change
    add_column :chatrooms, :last_read_at, :datetime
  end
end
