import { redirect } from "react-router-dom";
import { createOrder, OrderRequest } from "../services/apiRestaurant";

export type Errors = {
  phone?: string;
};

async function createOrderAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors: Errors = {};

  const order = {
    ...data,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === "on",
  } as OrderRequest;

  if (errorOccurred(order, errors)) {
    return errors;
  }

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

function errorOccurred(order: OrderRequest, errors: Errors) {
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) {
    return true;
  }

  return false;
}

const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export default createOrderAction;
