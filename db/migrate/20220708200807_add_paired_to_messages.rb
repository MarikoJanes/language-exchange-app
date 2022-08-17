class AddPairedToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :paired, :boolean
  end
end
