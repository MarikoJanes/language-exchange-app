class ApplicationController < ActionController::API
    include ActionController::Cookies
  
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    def current_user 
        User.find_by(id: session[:current_user])
    end

    def is_authorized?
        render json: { error: "Not Authorized" }, status: :unauthorized unless current_user
    end

    private

    def render_not_found(exception) 
        render json: { error: "#{exception.model} not found" }, status: :not_found
    end

    def render_invalid(invalid) 
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end