import OrdersClient from "@/components/dashboard/orders/OrdersClient";
import { getOrders } from "@/lib/getOrders";

export default async function OrdersPage() {
  const orders = await getOrders();
  return <OrdersClient orders={orders} />;
}
