class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest, :city, :profile_image_url
  has_many :language_to_learns
  has_many :language_to_teaches
  # has_many :conversations
  # has_many :messages
  #has_many :chatrooms

  include Rails.application.routes.url_helpers

  def profile_image_url
    rails_blob_path(object.profile_image_url, only_path: true) if object.profile_image_url.attached?
  end

end
