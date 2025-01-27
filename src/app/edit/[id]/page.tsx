import EditComponent from "./_edit-page";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditComponent id={id} />;
}
