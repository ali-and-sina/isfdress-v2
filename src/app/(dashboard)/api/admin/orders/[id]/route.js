import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";

const VALID_STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const { status } = await req.json();
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "وضعیت نامعتبر است" }, { status: 400 });
  }

  const order = await db.order.update({
    where: { id: Number(params.id) },
    data: { status },
  });

  return NextResponse.json({ order });
}
