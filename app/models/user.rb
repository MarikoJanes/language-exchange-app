class User < ApplicationRecord
    has_secure_password

    has_many :language_to_learns
    has_many :languages, through: :language_to_learns
    has_many :language_to_teaches
    has_many :languages, through: :language_to_teaches
    has_many :messages
    # has_many :conversations, through: :messages
    has_many :chatrooms

    has_one_attached :profile_image_url
end
