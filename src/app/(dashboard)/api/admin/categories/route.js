// import { NextResponse } from "next/server";

// import { query } from "@/lib/db";
// import { getCategories } from "@/lib/categories";

// export async function GET() {
//   try {
//     const categories = await getCategories();

//     return NextResponse.json({
//       categories,
//     });
//   } catch (error) {
//     console.error("GET /api/admin/categories:", error);

//     return NextResponse.json(
//       {
//         message: "خطا در دریافت دسته‌بندی‌ها",
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     const { ids } = await request.json();

//     if (!Array.isArray(ids) || ids.length === 0) {
//       return NextResponse.json(
//         {
//           message: "شناسه دسته‌بندی‌ها معتبر نیست",
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     await query(
//       `
//         DELETE FROM categories
//         WHERE id = ANY($1::int[])
//       `,
//       [ids],
//     );

//     return NextResponse.json({
//       message: "دسته‌بندی‌ها با موفقیت حذف شدند",
//     });
//   } catch (error) {
//     console.error("DELETE /api/admin/categories:", error);

//     return NextResponse.json(
//       {
//         message: "خطا در حذف دسته‌بندی‌ها",
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }
