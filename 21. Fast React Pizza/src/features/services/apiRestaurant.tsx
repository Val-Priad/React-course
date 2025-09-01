const API_URL = "https://react-fast-pizza-api.jonas.io/api";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();
  return data;
}

export async function getOrder(id: string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder: OrderRequest) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(
  id: string,
  updateObj: { priority: boolean },
) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}

export interface OrderRequest {
  customer: string;
  phone: string;
  address: string;
  cart: CartItem[];
  priority: boolean;
}

export interface OrderData {
  customer: string;
  status: "delivered" | "pending" | "preparing" | string;
  priority: boolean;
  cart: CartItem[];
  id: string;
  estimatedDelivery: string; // ISO timestamp Ex: 2023-04-25T06:42:22.937Z
  orderPrice: number;
  priorityPrice: number;
}

export interface OrderResponse {
  status: "success" | "fail";
  data?: OrderData;
  message?: string;
}

export interface CartItem {
  pizzaId: number;
  addIngredients: string[];
  removeIngredients: string[];
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type Pizza = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};
