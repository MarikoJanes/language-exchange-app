class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :partner_id, :paired, :last_read_at
  has_many :messages
end
