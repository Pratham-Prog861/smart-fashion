module Spree
  module Admin
    module ImagesControllerDecorator
      def create_from_url
        @product = Spree::Product.find(params[:product_id])
        
        if params[:image_url].present?
          begin
            require 'open-uri'
            downloaded_image = URI.open(params[:image_url])
            
            image = @product.images.new
            image.attachment.attach(
              io: downloaded_image,
              filename: File.basename(URI.parse(params[:image_url]).path)
            )
            
            if image.save
              flash[:success] = 'Image added successfully from URL'
            else
              flash[:error] = 'Failed to add image'
            end
          rescue => e
            flash[:error] = "Error downloading image: #{e.message}"
          end
        else
          flash[:error] = 'Please provide an image URL'
        end
        
        redirect_to admin_product_images_path(@product)
      end
    end
  end
end

Spree::Admin::ImagesController.prepend(Spree::Admin::ImagesControllerDecorator)
