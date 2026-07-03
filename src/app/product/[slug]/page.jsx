export default async function ProductPage({ params }) {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <h1>{slug}</h1>
      <h2>Hello</h2>
    </div>
  );
}
