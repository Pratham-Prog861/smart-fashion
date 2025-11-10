Devise.setup do |config|
  config.secret_key = ENV.fetch('SECRET_KEY_BASE') { '6a2c3e1de0d5ce17156d96471a538e1ad73c63bf0fbb8a142ec69906bd82ea75ce9e60761d58013878b261251aa8c29ac02a' }
  config.mailer_sender = 'please-change-me@example.com'
  require 'devise/orm/active_record'
  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]
  config.skip_session_storage = [:http_auth]
  config.stretches = Rails.env.test? ? 1 : 12
  config.reconfirmable = true
  config.expire_all_remember_me_on_sign_out = true
  config.password_length = 6..128
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/
  config.reset_password_within = 6.hours
  config.sign_out_via = :delete
end
