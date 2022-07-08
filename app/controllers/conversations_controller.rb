class ConversationsController < ApplicationController

    def index 
        render json: Conversation.all
    end

    def show 
        conversation = Conversation.find(params[:id])
        render json: conversation 
    end

    def create 
        conversation = Conversation.create!
        serializef_data = ActiveModelSerializers::Adapter::Json.new(
            ConversationSerializer.new(conversation)
        ).serializable_hash
        ActionCable.server.broadcast "conversations_channel", serialized_data
        head :ok

        # render json: conversation, status: :created
    end

    def destroy 
        conversation = Conversation.find(params[:id])
        conversation.destroy
        head :no_content
    end
 

  

end
