class AddNameToLanguaeToLearns < ActiveRecord::Migration[6.1]
  def change
    add_column :language_to_learns, :name, :string
  end
end
