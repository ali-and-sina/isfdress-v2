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

export async function PATCH(req, { params }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const body = await req.json();
  const product = await db.product.update({
    where: { id: Number(params.id) },
    data: {
      name: body.name,
      category: body.category,
      price: body.price,
      stock: body.stock,
      description: body.description,
    },
  });

  return NextResponse.json({ product });
}

export async function DELETE(req, { params }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  await db.product.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
