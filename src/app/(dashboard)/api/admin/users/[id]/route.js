import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const targetId = Number(params.id);

  // امنیت: ادمین نباید بتونه نقش خودش رو عوض کنه (جلوگیری از قفل‌شدن خارج از پنل)
  if (targetId === Number(session.user.id)) {
    return NextResponse.json(
      { error: "امکان تغییر نقش خودتان وجود ندارد" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const user = await db.user.update({
    where: { id: targetId },
    data: {
      ...(body.role && { role: body.role }),
      ...(typeof body.blocked === "boolean" && { blocked: body.blocked }),
    },
  });

  return NextResponse.json({ user });
}
