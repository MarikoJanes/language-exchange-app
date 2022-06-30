Rails.application.routes.draw do
 
  resources :users, only: [:index, :show, :create, :update]
 # login
  post "/login", to: "sessions#login"

  # stay looged in
  get "/authorized_user", to: "sessions#show"

  # logout
  delete "logout", to: "sessions#logout"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end
