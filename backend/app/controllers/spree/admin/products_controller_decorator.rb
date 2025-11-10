module Spree
  module Admin
    module ProductsControllerDecorator
      def upload_ar_model
        @product = Spree::Product.find(params[:id])
        
        if params[:ar_model].present?
          @product.ar_model.attach(params[:ar_model])
          flash[:success] = 'AR model uploaded successfully'
        else
          flash[:error] = 'Please select a GLB file'
        end
        
        redirect_to edit_admin_product_path(@product)
      end
    end
  end
end

Spree::Admin::ProductsController.prepend(Spree::Admin::ProductsControllerDecorator)
