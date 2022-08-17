class User < ApplicationRecord
    has_secure_password

    has_many :language_to_learns
    has_many :languages, through: :language_to_learns
    has_many :language_to_teaches
    has_many :languages, through: :language_to_teaches
    has_many :chatrooms
    has_many :notes

    validates :name, presence: true, uniqueness: true
    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: true


    has_one_attached :profile_image_url
end
