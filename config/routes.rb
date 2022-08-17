Rails.application.routes.draw do
 
  resources :messages
  resources :chatrooms
  resources :notes
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :languages, only: [:index]
  resources :language_to_learns, only: [:index, :show, :create, :destroy]
  resources :language_to_teaches, only: [:index, :show, :create, :destroy] 

  get "/search/learners/:searchedLearnLang", to: "users#learn_search"
  get "/search/teachers/:searchedTeachLang", to: "users#teach_search"


  post "/signup", to: "users#create"
  post "/login", to: "sessions#login"

  # stay looged in
  get "/authorized_user", to: "sessions#show"

  # logout
  delete "logout", to: "sessions#logout"


  # for action cable, real-time chat
  #it’s the special sauce that allows us to establish a live connection between our frontend and our backend.
  mount ActionCable.server => "/cable"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end
