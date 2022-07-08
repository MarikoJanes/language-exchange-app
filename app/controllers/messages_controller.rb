class MessagesController < ApplicationController
    before_action :is_authorized?

    def index 
        render json: Message.all 
    end

    # def index
    #     user = User.find(params[:user_id])
    #     team_ids = user.memberships.pluck(:team_id)
    #     messages = Message.where(team_id: team_ids)
    #     render json: MessageSerializer.new(messages).serialized_json
    #   end

    # def create 
    #     message = Message.create!(message_params)
    #     conversation = message.conversation 
    #     broadcast(conversation)
    #     render json: message 
    # end

    # def create
    #     message = Message.create!(message_params)
    #     conversation = Conversation.find(message_params[:conversation_id])
    #     serialized_data = ActiveModelSerializers::Adapter::Json.new(
    #         MessageSerializer.new(message)
    #     ).serializable_hash
    #     MessagesChannel.broadcast_to conversation, seralized_data 
    #     head :ok
    # end


    # private 

    # def messages_params 
    #     params.permit(:content, :user_id, :conversation_id)
    # end

    # def broadcast(conversation)
    #     ConversationChannel.broadcast_to(conversation, {
    #         conversation: conversation,
    #         users: conversation.users,
    #         messages: conversation.messages
    #     })
    # end

end
