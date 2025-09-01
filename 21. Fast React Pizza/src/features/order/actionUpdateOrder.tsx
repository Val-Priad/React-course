import { updateOrder } from "../services/apiRestaurant";

async function actionUpdateOrder({ params }: { params: { orderId?: string } }) {
  if (!params.orderId) return null;

  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
}

export default actionUpdateOrder;
