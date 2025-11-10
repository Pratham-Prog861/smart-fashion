# API Documentation

## Spree Storefront API v2

Base URL: `http://localhost:3001/api/v2/storefront`

### Authentication

Most endpoints don't require authentication for browsing. For cart and checkout operations, you'll need an order token.

```typescript
headers: {
  'Content-Type': 'application/json',
  'X-Spree-Order-Token': 'order-token-here'
}
```

## Products

### List Products

```http
GET /products
```

**Query Parameters:**

- `page` (integer): Page number
- `per_page` (integer): Items per page (default: 25)
- `filter[name]` (string): Filter by name
- `filter[price]` (string): Filter by price
- `filter[taxons]` (string): Filter by category

**Example:**

```typescript
const response = await fetch(
  "http://localhost:3001/api/v2/storefront/products?page=1&per_page=12"
);
const data = await response.json();
```

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "type": "product",
      "attributes": {
        "name": "Classic White Shirt",
        "description": "Premium cotton shirt...",
        "price": "49.99",
        "display_price": "$49.99",
        "available_on": "2024-01-01T00:00:00.000Z",
        "slug": "classic-white-shirt"
      },
      "relationships": {
        "images": {
          "data": [...]
        }
      }
    }
  ],
  "meta": {
    "count": 100,
    "total_count": 100,
    "total_pages": 9
  }
}
```

### Get Product

```http
GET /products/:id
```

**Example:**

```typescript
const response = await fetch(
  "http://localhost:3001/api/v2/storefront/products/1"
);
const data = await response.json();
```

## Categories (Taxons)

### List Categories

```http
GET /taxons
```

**Example:**

```typescript
const response = await fetch("http://localhost:3001/api/v2/storefront/taxons");
const data = await response.json();
```

## Cart

### Create Cart

```http
POST /cart
```

**Example:**

```typescript
const response = await fetch("http://localhost:3001/api/v2/storefront/cart", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
});
const data = await response.json();
const orderToken = data.data.attributes.token;
```

### Add Item to Cart

```http
POST /cart/add_item
```

**Headers:**

- `X-Spree-Order-Token`: Order token from cart creation

**Body:**

```json
{
  "variant_id": "1",
  "quantity": 2
}
```

**Example:**

```typescript
const response = await fetch(
  "http://localhost:3001/api/v2/storefront/cart/add_item",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Spree-Order-Token": orderToken,
    },
    body: JSON.stringify({
      variant_id: "1",
      quantity: 2,
    }),
  }
);
```

### Update Cart Item

```http
PATCH /cart/set_quantity
```

**Body:**

```json
{
  "line_item_id": "1",
  "quantity": 3
}
```

### Remove Cart Item

```http
DELETE /cart/remove_line_item/:line_item_id
```

### Get Cart

```http
GET /cart
```

**Headers:**

- `X-Spree-Order-Token`: Order token

## Checkout

### Update Checkout

```http
PATCH /checkout
```

**Body:**

```json
{
  "order": {
    "email": "customer@example.com",
    "bill_address_attributes": {
      "firstname": "John",
      "lastname": "Doe",
      "address1": "123 Main St",
      "city": "New York",
      "zipcode": "10001",
      "country_id": 1,
      "state_id": 1,
      "phone": "555-1234"
    },
    "ship_address_attributes": {
      // Same as bill_address_attributes
    }
  }
}
```

### Complete Checkout

```http
PATCH /checkout/complete
```

## Search

### Search Products

```http
GET /products?filter[name]=shirt
```

**Example:**

```typescript
const searchQuery = "blue jeans";
const response = await fetch(
  `http://localhost:3001/api/v2/storefront/products?filter[name]=${searchQuery}`
);
```

## Frontend API Client

### Setup

```typescript
// utils/spreeApi.ts
import { makeClient } from "@spree/storefront-api-v2-sdk";

const client = makeClient({
  host: process.env.NEXT_PUBLIC_SPREE_API_URL,
});
```

### Usage Examples

#### Get Products

```typescript
const response = await client.products.list({
  page: 1,
  per_page: 12,
});

if (response.success()) {
  const products = response.data;
}
```

#### Search Products

```typescript
const response = await client.products.list({
  filter: {
    name: "shirt",
  },
});
```

#### Create Cart

```typescript
const response = await client.cart.create();
const orderToken = response.data.attributes.token;
```

#### Add to Cart

```typescript
await client.cart.addItem(
  { orderToken },
  {
    variant_id: "1",
    quantity: 2,
  }
);
```

## Error Handling

### Error Response Format

```json
{
  "error": "Not Found",
  "errors": {
    "base": ["Product not found"]
  }
}
```

### Handling Errors

```typescript
const response = await client.products.show("invalid-id");

if (response.fail()) {
  console.error(response.error);
  // Handle error
}
```

## Rate Limiting

- No rate limiting on development
- Production: 100 requests per minute per IP
- Authenticated: 1000 requests per minute

## CORS

Configured to allow requests from:

- `http://localhost:3000` (development)
- Your production frontend URL

## Webhooks (Future)

Planned webhook events:

- `order.created`
- `order.completed`
- `product.created`
- `product.updated`

## SDK Reference

Full SDK documentation: [Spree Storefront API SDK](https://github.com/spree/spree-storefront-api-v2-js-sdk)

## Postman Collection

Import this collection to test the API:

```json
{
  "info": {
    "name": "Smart Fashion API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Products",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/products"
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3001/api/v2/storefront"
    }
  ]
}
```
