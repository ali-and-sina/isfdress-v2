import CategoryForm from "@/components/dashboard/categories/CategoryForm";

export default async function EditCategoryPage({ params }) {
  const { id } = await params;

  /*
بعداً:


const category =
  await getCategoryById(id);

اگر پیدا نشد:
notFound();


*/

  const category = {
    id,

    name: "شال و روسری",

    slug: "accessories-scarf",

    description: "انواع شال و روسری زنانه",

    images: [
      {
        id: "image-1",

        preview: "https://i.imgur.com/TMW5Zhc_d.jpg",

        isNew: false,
      },
    ],
  };

  return <CategoryForm mode="edit" initialData={category} />;
}
