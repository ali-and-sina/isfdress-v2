import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });

  const formatted = orders.map((o) => ({
    id: o.id,
    customerName: o.customer?.fullName || o.customer?.name || "-",
    customerPhone: o.customer?.phone || "-",
    total: o.total,
    status: o.status,
    createdAt: o.createdAt,
  }));

  return NextResponse.json({ orders: formatted });
}
