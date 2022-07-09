class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :partner_id, :paired
  #belongs_to :user
  # has_one :conversation
end
