class CreateChatrooms < ActiveRecord::Migration[6.1]
  def change
    create_table :chatrooms do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :partner_id
      t.boolean :paired

      t.timestamps
    end
  end
end
