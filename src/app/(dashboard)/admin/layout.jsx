import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/dashboard/DashboardShell";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "پنل مدیریت ",
};

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/dashboard");
  }

  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}
