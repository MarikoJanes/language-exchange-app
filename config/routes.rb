Rails.application.routes.draw do
 
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
