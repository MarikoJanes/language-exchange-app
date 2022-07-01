Rails.application.routes.draw do
 
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :languages, only: [:index]


  post "/signup", to: "users#create"
  post "/login", to: "sessions#login"

  # stay looged in
  get "/authorized_user", to: "users#show"

  # logout
  delete "logout", to: "sessions#logout"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end
