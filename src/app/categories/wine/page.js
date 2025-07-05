import CategoryPage from "@/components/CategoryPage";

export default function WinePage() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center my-10 tracking-tight">
        Вино
      </h1>
      <CategoryPage category="wine" />
    </>
  );
}
