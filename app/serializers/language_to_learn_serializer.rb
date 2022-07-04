class LanguageToLearnSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :language_id, :name
end
