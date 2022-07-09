class MessagesController < ApplicationController
    #before_action :is_authorized?

    def index 
        render json: Message.all 
    end

end
