class MessageRelayJob < ApplicationJob 
    queue_as :default 

    def perform(message)
        conversation = message.conversation 
        MessagesChannel.broadcast_to(conversation, MessageSerializer.new(message))
    end

end