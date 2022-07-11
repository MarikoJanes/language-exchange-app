class ChatroomsController < ApplicationController

    def index 
        render json: Chatroom.all
    end

    def show 
        chatroom = Chatroom.find(params[:id])
        render json: chatroom 
    end

    def create
        chatroom = Chatroom.create!(chatroom_params)
        #serialized_data = ActiveModelSerializers::Adapter::Json.new(
        #    ChatroomSerializer.new(chatroom)
        #).serializable_hash
        #ActionCable.server.broadcast "messages_channel", serialized_data
        #head :ok

        render json: chatroom, status: :created
    end


    def destroy 
        chatroom = Chatroom.find(params[:id])
        chatroom.destroy
        head :no_content
    end

    private
    
    def chatroom_params
        params.permit(:user_id, :partner_id, :paired, :last_read_at)
    end
 
end
