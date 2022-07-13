class NotesController < ApplicationController

    def index 
        user_note = Note.select { |note| note.user_id == current_user.id}
        render json: user_note
        # render json: Note.all
    end

    def show 
        note = note_find 
        render json: note 
    end

    def create 
        note = Note.create!(note_params)
        render json: note, status: :created
    end

    def update 
        note = note_find
        note.update!(note_params)
        render json: note, status: :accepted
    end

    def destroy 
        note = note_find
        note.destroy 
        head :no_content
    end

    private 
    
    def note_find
        Note.find(params[:id])
    end
    
    def note_params
        params.permit(:id, :user_id, :chatroom_id, :content)
    end


end
