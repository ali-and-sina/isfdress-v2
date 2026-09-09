import UsersClient from "@/components/dashboard/users/UsersClient";
import { getUsers } from "@/lib/users";

export default async function Page() {
  const users = await getUsers();

  return <UsersClient users={users} />;
}
