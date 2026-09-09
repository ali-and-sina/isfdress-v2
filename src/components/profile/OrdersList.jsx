import OrderCard from "./OrderCard";
import EmptyOrders from "./EmptyOrders";

export default function OrdersList({ orders }) {
  if (!orders.length) {
    return <EmptyOrders />;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
