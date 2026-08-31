import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") return null;
  return session.user;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const users = await db.user.findMany({
    orderBy: { id: "desc" },
    select: {
      id: true,
      fullName: true,
      phone: true,
      email: true,
      role: true,
      blocked: true,
    },
  });

  return NextResponse.json({ users });
}

// bulk block/unblock
export async function PATCH(req) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const { ids, blocked } = await req.json();
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "هیچ کاربری انتخاب نشده" }, { status: 400 });
  }

  // امنیت: ادمین نباید بتونه خودش رو مسدود کنه
  const filteredIds = ids.filter((id) => id !== admin.id);

  await db.user.updateMany({
    where: { id: { in: filteredIds.map(Number) } },
    data: { blocked },
  });

  return NextResponse.json({ success: true });
}
