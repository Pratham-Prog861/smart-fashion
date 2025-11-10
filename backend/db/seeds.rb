# Create default store
Spree::Store.create!(
  name: 'Smart Fashion',
  url: 'localhost:3000',
  mail_from_address: 'noreply@smartfashion.com',
  code: 'smart-fashion',
  default: true,
  default_currency: 'USD'
) unless Spree::Store.exists?

# Create sample products
def create_product(name, category, price, description)
  store = Spree::Store.first
  product = Spree::Product.create!(
    name: name,
    description: description,
    price: price,
    available_on: Time.current,
    shipping_category: Spree::ShippingCategory.first_or_create!(name: 'Default'),
    stores: [store]
  )
  
  # Create master variant
  product.master.update!(
    sku: "#{category.upcase}-#{rand(1000..9999)}",
    cost_price: price * 0.6,
    weight: 0.5,
    height: 10,
    width: 10,
    depth: 5
  )
  
  # Add to taxonomy
  taxonomy = Spree::Taxonomy.find_by(name: 'Categories', store: store)
  unless taxonomy
    taxonomy = Spree::Taxonomy.create!(name: 'Categories', store: store)
  end
  
  taxon = taxonomy.taxons.find_by(name: category)
  unless taxon
    taxon = taxonomy.root.children.create!(name: category, taxonomy: taxonomy)
  end
  
  product.taxons << taxon unless product.taxons.include?(taxon)
  
  # Stock
  stock_location = Spree::StockLocation.first_or_create!(
    name: 'Default',
    default: true
  )
  stock_item = product.master.stock_items.find_or_create_by!(stock_location: stock_location)
  stock_item.set_count_on_hand(100)
  
  product
end

puts 'Creating sample products...'

# Shirts
create_product(
  'Classic White Shirt',
  'Shirts',
  49.99,
  'Premium cotton shirt with a classic fit. Perfect for both casual and formal occasions.'
)

create_product(
  'Black Polo Shirt',
  'Shirts',
  54.99,
  'Comfortable polo shirt made from breathable fabric. Ideal for everyday wear.'
)

create_product(
  'Striped Casual Shirt',
  'Shirts',
  44.99,
  'Trendy striped shirt with a modern fit. Great for casual outings.'
)

# Jeans
create_product(
  'Blue Denim Jeans',
  'Jeans',
  79.99,
  'Classic blue denim jeans with a comfortable fit. A wardrobe essential.'
)

create_product(
  'Slim Fit Jeans',
  'Jeans',
  89.99,
  'Modern slim fit jeans that look great with any outfit.'
)

create_product(
  'Black Skinny Jeans',
  'Jeans',
  84.99,
  'Sleek black skinny jeans for a contemporary look.'
)

# Goggles
create_product(
  'Aviator Sunglasses',
  'Goggles',
  129.99,
  'Classic aviator sunglasses with UV protection. Timeless style.'
)

create_product(
  'Round Sunglasses',
  'Goggles',
  99.99,
  'Vintage-inspired round sunglasses. Perfect for sunny days.'
)

create_product(
  'Sport Sunglasses',
  'Goggles',
  149.99,
  'High-performance sport sunglasses with polarized lenses.'
)

puts 'Sample products created successfully!'

Spree::Core::Engine.load_seed if defined?(Spree::Core)
Spree::Auth::Engine.load_seed if defined?(Spree::Auth)
