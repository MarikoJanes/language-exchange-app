class LanguageToLearnsController < ApplicationController

    def index 
        render json: LanguageToLearn.all 
    end

    def show 
        lang = find_lang
        render json: lang
    end

    def create
        langArr = ActiveSupport::JSON.decode(request.body.read)
        langArr.each do |lang|
            LanguageToLearn.create!(
                user_id: session[:current_user],
                language_id: lang["id"],
                name: lang["name"]
            )
            
        end
        render json: langArr, status: :created
    end

    def destroy 
        lang = find_lang
        lang.destroy 
        head :no_content
    end

    private 

    def find_lang 
        LanguageToLearn.find(params[:id])
    end

    def lang_params 
        params.permit(:user_id, :language_id, :name)
    end

end
