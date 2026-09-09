import WelcomePage from "@/components/dashboard/dashboard/WelcomePage";
import { auth } from "@/lib/auth";

export default async function Page() {
  const data = await auth();
  const user = data.user;
  return <WelcomePage user={user} />;
}
