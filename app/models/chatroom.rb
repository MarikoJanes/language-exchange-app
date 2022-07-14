class Chatroom < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :notes, dependent: :destroy
  belongs_to :user


end
