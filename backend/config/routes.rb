Rails.application.routes.draw do
  mount Spree::Core::Engine, at: '/'
  
  namespace :spree do
    namespace :admin do
      resources :products do
        resources :images do
          collection do
            post :create_from_url
          end
        end
      end
    end
  end
end
