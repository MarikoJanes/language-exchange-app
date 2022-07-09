class MessageSerializer < ActiveModel::Serializer

  attributes :id, :sender_id, :recipient_id, :content, :paired, :created_at
  #belongs_to :user
  # belongs_to :conversation
end
