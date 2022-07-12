class Chatroom < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :notes
  belongs_to :user


end
