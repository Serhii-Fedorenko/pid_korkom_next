"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm({ initialSearch = "" }) {
  const [search, setSearch] = useState(initialSearch);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = search.trim()
      ? `?search=${encodeURIComponent(search)}&page=1`
      : "?page=1";
    router.push(query);
    setSearch('')
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-6">
      <input
        type="text"
        placeholder="Пошук за заголовком"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2 border rounded shadow-sm"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-black text-white rounded hover:text-gray-200"
      >
        Пошук
      </button>
    </form>
  );
}
