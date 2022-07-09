class MessagesChannel < ApplicationCable::Channel
  def subscribed
     stop_all_streams
     stream_from "message_#{params[:user_id]}#{params[:recipient_id]}"       
  end

  def receive(data)
    puts("received the message")
    #puts params
    puts data
    puts("that was params")
    
    # chatroom = Chatroom.find_by(id: data["conversation_id"])
    user = User.find_by(id: data["sender_id"])
    message = Message.create!(content: data["content"], sender_id: data["sender_id"], recipient_id: data["recipient_id"])
    # MessagesChannel.broadcast_to(conversation, {conversation_id: conversation.id, users_id: conversation.users.id, content:conversation.messages})
    #ActionCable.server.broadcast("message_#{data[:sender_id]}#{data[:recipient_id]}", message)

    channel = "message_"+data["recipient_id"].to_s+data["sender_id"].to_s
    puts(channel)
    #The real one
    ActionCable.server.broadcast(channel, message)

    #MessageRelayJob.perform_later(message)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

end
