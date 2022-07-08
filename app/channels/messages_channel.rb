class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # stop_all_streams
    # puts("id")
    # puts(params[:id])
    # conversation = Conversation.find(params[:id])
    # stream_from "message_#{params[:user_id]}#{params[:recipient_id]}"       
    stream_for conversation
  end

  def receive(data)
    # puts("received the message")
    # puts params
    
    # conversation = Conversation.find_by(id: data["conversation_id"])
    # user = User.find_by(id: data["user_id"])
    # message = Message.create!(content: data["content"], user_id: user.id, conversation_id: conversation.id)
    # # MessagesChannel.broadcast_to(conversation, {conversation_id: conversation.id, users_id: conversation.users.id, content:conversation.messages})

    # MessageRelayJob.perform_later(message)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

end
