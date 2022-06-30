class SessionsController < ApplicationController
    before_action :is_authorized?, except: [:login]

    def show 
        user = User.find_by(id: session[:current_user])
        render json: user
    end

    def login 
        user = User.find_by(name: params[:name])
        if user&.authenticate(params[:password])
            session[:current_user] = user.id
            session[:login_attempts] = 0

            render json: user, status: :ok 
        else
            session[:login_attempts] ||= 0
            session[:login_attempts] += 1

            render json: { error: "Invalid Password and/or Username" }, status: :unauthorized
        end
    end

    def logout 
        session.delete :current_user
    end

    
end
