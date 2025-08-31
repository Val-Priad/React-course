import { Form, useActionData, useNavigation } from "react-router-dom";
import { type Errors } from "./actionCreateOrder";
import Button from "../ui/Button";
import { useAppSelector } from "../../store";

// https://uibakery.io/regex-library/phone-number
const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const username = useAppSelector((state) => state.user.username);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData() as Errors;

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

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:text-md sm:basis-40">
            Address
          </label>
          <div className="grow">
            <input
              type="text"
              name="address"
              id="address"
              className="input w-full"
            />
          </div>
        </div>

        <div className="align-center flex gap-x-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="mt-4 text-right">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" isSubmitting={isSubmitting}>
            {isSubmitting ? <>Placing Order...</> : <>Order now</>}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
