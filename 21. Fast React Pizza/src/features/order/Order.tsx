import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../utilities/helpers";
import { OrderData, Pizza } from "../services/apiRestaurant";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData() as OrderData;
  const fetcher = useFetcher();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    cart,
    status,
    id,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  return (
    <div className="gap-2 space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="space-y-8 px-4 py-6 text-xl font-semibold">
          Order #{id} status
        </h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-stone-200 border-t border-b border-stone-200">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            ingredients={
              fetcher.data?.find((pizza: Pizza) => pizza.id === item.pizzaId)
                .ingredients
            }
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="tex-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="fond-medium text-sm text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder />}
    </div>
  );
}

export default Order;
