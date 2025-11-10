import { makeClient } from "@spree/storefront-api-v2-sdk";
import type { SpreeProduct } from "@/types";

const client = makeClient({
  host: process.env.NEXT_PUBLIC_SPREE_API_URL || "http://localhost:3001",
});

export async function getProducts(params?: {
  page?: number;
  perPage?: number;
  filter?: Record<string, string>;
}) {
  try {
    const response = await client.products.list({
      page: params?.page || 1,
      per_page: params?.perPage || 12,
      filter: params?.filter,
    });

    return response.success() ? response.data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(id: string) {
  try {
    const response = await client.products.show(id);
    return response.success() ? response.data : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function searchProducts(query: string) {
  try {
    const response = await client.products.list({
      filter: {
        name: query,
      },
    });

    return response.success() ? response.data : [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

export async function createOrder(
  items: Array<{ variant_id: string; quantity: number }>
) {
  try {
    const response = await client.cart.create();

    if (!response.success()) {
      throw new Error("Failed to create cart");
    }

    const orderToken = response.data.attributes.token;

    for (const item of items) {
      await client.cart.addItem(
        { orderToken },
        {
          variant_id: item.variant_id,
          quantity: item.quantity,
        }
      );
    }

    return orderToken;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
}
