class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :partner_id, :paired
  has_many :messages
end
