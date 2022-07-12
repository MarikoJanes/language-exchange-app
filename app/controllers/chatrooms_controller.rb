class ChatroomsController < ApplicationController

    def index 
        render json: Chatroom.all
    end

    def show 
        chatroom = Chatroom.find(params[:id])
        render json: chatroom 
    end

    def create
        
        existing_chatroom = Chatroom.find_by(:user_id => params[:user_id], partner_id: params[:partner_id])
        reversed_chatroom = Chatroom.find_by(:user_id => params[:partner_id], partner_id: params[:user_id])
        byebug
        if existing_chatroom == nil && reversed_chatroom == nil
            chatroom = Chatroom.create(chatroom_params)
            render json: chatroom, status: :created
        elsif existing_chatroom != nil
            render json: existing_chatroom
        else
            render json: reversed_chatroom
        end

        #serialized_data = ActiveModelSerializers::Adapter::Json.new(
        #    ChatroomSerializer.new(chatroom)
        #).serializable_hash
        #ActionCable.server.broadcast "messages_channel", serialized_data
        #head :ok

       
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
