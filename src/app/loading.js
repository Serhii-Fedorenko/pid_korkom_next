export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-black mb-4" />
      <p className="text-lg">Завантаження...</p>
    </div>
  );
}
