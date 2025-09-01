import { Form, useActionData, useNavigation } from "react-router-dom";
import { type Errors } from "./actionCreateOrder";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../store";
import { getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import { useState } from "react";
import { fetchAddress } from "../user/UserSlice";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const totalPrice = useAppSelector(getTotalCartPrice);
  const priorityPrice = totalPrice * 0.2;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData() as Errors;
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useAppSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mt-4 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST" className="mt-10">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="customer" className="sm:text-md sm:basis-40">
            First Name
          </label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              id="customer"
              className="input w-full"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone" className="sm:text-md sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="input w-full"
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:text-md sm:basis-40">
            Address
          </label>
          <div className="grow">
            <input
              type="text"
              name="address"
              id="address"
              className="input w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {!position.latitude && !position.longitude && (
              <span className="absolute top-1.5 right-2">
                <Button
                  disabled={isLoadingAddress}
                  type="small"
                  onClick={() => dispatch(fetchAddress())}
                >
                  get location
                </Button>
              </span>
            )}
            {addressStatus === "error" && (
              <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="align-center flex gap-x-4">
          <input
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="mt-4 text-right">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? (
              <>Placing Order...</>
            ) : (
              <>
                Order now from{" "}
                {withPriority ? totalPrice + priorityPrice : totalPrice}
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
