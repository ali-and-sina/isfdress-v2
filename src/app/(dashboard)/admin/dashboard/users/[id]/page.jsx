import UserDetailsClient from "@/components/dashboard/users/UserDetailsClient";
import { getUserById, getUserOrders, getUserStats } from "@/lib/users";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;

  const user = await getUserById(id);

  console.log(user);
  if (!user) {
    notFound();
  }

  const [orders, stats] = await Promise.all([
    getUserOrders(id),
    getUserStats(id),
  ]);

  return <UserDetailsClient user={user} orders={orders} stats={stats} />;
}
