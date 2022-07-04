class CreateLanguageToLearns < ActiveRecord::Migration[6.1]
  def change
    create_table :language_to_learns do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :language, null: false, foreign_key: true

      t.timestamps
    end
  end
end
