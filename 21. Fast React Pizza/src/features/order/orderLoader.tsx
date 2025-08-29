import { LoaderFunctionArgs } from "react-router-dom";
import { getOrder } from "../services/apiRestaurant";

export default async function orderLoader({ params }: LoaderFunctionArgs) {
  if (!params.orderId) throw new Error("Order not found");

  console.log(params.orderId);
  const order = await getOrder(params.orderId);
  return order;
}
