import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return null;
  }
  return session.user;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const products = await db.product.findMany({
    orderBy: { id: "desc" },
  });

  return NextResponse.json({ products });
}

export async function POST(req) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const body = await req.json();

  if (!body.name || !body.category || !body.price) {
    return NextResponse.json(
      { error: "اطلاعات محصول ناقص است" },
      { status: 400 }
    );
  }

  const product = await db.product.create({
    data: {
      name: body.name,
      category: body.category,
      price: body.price,
      stock: body.stock ?? 0,
      description: body.description || "",
    },
  });

  return NextResponse.json({ product }, { status: 201 });
}

export async function DELETE(req) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const { ids } = await req.json();
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "هیچ موردی انتخاب نشده" }, { status: 400 });
  }

  await db.product.deleteMany({
    where: { id: { in: ids.map(Number) } },
  });

  return NextResponse.json({ success: true });
}
