class LanguageToTeachesController < ApplicationController

    def index 
        render json: LanguageToTeach.all 
    end

    def create 
        langArr = ActiveSupport::JSON.decode(request.body.read)
        langArr.each do |lang|
            LanguageToTeach.create!(
                user_id: session[:current_user],
                language_id: lang["id"],
                name: lang["name"]
            )
            
        end
        render json: langArr, status: :created
    end

    # def update 
    #     lang = find_lang
    #     lang.update!(lang_params)
    #     render json: lang, status: :accepted 
    # end

    def destroy 
        lang = find_lang
        lang.destroy 
        head :no_content
    end

    private 

    def find_lang 
        LanguageToTeach.find(params[:id])
    end

    def lang_params 
        params.permit(:user_id, :language_id, :name)
    end

end
