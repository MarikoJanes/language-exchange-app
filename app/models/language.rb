class Language < ApplicationRecord
    has_many :language_to_learns
    has_many :users, through: :language_to_learns
    has_many :language_to_teaches
    has_many :users, through: :language_to_teaches
end
