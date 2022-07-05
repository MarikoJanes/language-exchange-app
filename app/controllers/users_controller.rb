class UsersController < ApplicationController
    before_action :is_authorized?, except: [:create, :index, :destroy]

    def index
        render json: User.all, include: ["language_to_learns", "language_to_teaches"]
    end

    def show 
        user = User.find_by(id: session[:current_user])
        render json: user
    end

    def create 
        user = User.create!(user_params)
        if user.valid?
            session[:current_user] = user.id
            render json: user, status: :created
        end

    end

    def update 
        user = User.find_by(id: session[:current_user])
        user.update!(user_params)
        render json: user, status: :accepted
    end

    def destroy 
        user = User.find_id(id: session[:current_user])
        user.destroy
        head :no_content
    end

    def learn_search 
        lang = params[:searchedLearnLang].capitalize()
        lang_id = Language.find_by(name: lang).id

        result = User.joins(:language_to_learns).where(language_to_learns: {language_id: lang_id})
        render json: result
    end

    def teach_search 
        lang = params[:searchedTeachLang].capitalize()
        lang_id = Language.find_by(name: lang).id
        result = User.joins(:language_to_teaches).where(language_to_teaches: {language_id: lang_id})
        render json: result
    end


    private 

    def user_params 
        params.permit(:id, :name, :email, :password, :password_confirmation, :city, :profile_image_url)
    end

end


