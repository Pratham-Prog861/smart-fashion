Deface::Override.new(
  virtual_path: 'spree/admin/images/index',
  name: 'add_url_upload_form',
  insert_before: '[data-hook="admin_images_index_rows"]',
  partial: 'spree/admin/images/url_form'
)
