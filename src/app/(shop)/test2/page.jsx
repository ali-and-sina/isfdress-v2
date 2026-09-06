import { getOrders } from "@/lib/getOrders";

export default async function ProductPage({ params }) {
  const orders = await getOrders();
  console.log(orders);

  return <></>;
}
