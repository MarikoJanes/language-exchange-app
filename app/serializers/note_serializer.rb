class NoteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :chatroom_id, :content
end
