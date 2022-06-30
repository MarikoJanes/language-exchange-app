class UsersController < ApplicationController
    before_action :is_authorized?, except: [:create, :index]

    def index 
        render json: User.all
    end

    def show 
        user = User.find_by(id: session[:current_user])
        render json: user
    end

    def create 
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def update 
        user = User.find_by(id: session[:current_user])
        user.update!(user_params)
        render json: user, status: :accepted
    end

    # def destroy 
    #     user = User.find(params[:id])
    #     user.destroy
    #     head :no_content
    # end

    private 

    def user_params 
        params.permit(:name, :email, :password, :password_confirmation, :city, :profile_image_url)
    end

end
