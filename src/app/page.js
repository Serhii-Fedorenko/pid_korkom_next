import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }) {
  const BASE_URL = "https://pid-korkom-api.onrender.com/api/articles";
  const LIMIT = 9;
  const pageParams = await searchParams;
  const page = Number(pageParams?.page) || 1;
  const query = await searchParams;
  const search = query?.search || "";

  const res = await fetch(
    `${BASE_URL}?page=${page}&limit=${LIMIT}&search=${search}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  const { articles, totalPages } = res;

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-10 tracking-tight">
        Головна сторінка
      </h1>
      <SearchForm initialSearch={search} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto px-4">
        {articles.map((article) => (
          <li
            key={article._id}
            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden bg-white"
          >
            <Link href={`/articles/${article.slug}`} className="block p-4">
              <article>
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-700 mb-4 line-clamp-4">
                  {article.text}
                </p>
                {article.image && (
                  <div className="relative w-full h-[200px] rounded overflow-hidden">
                    <Image
                      src={article.image.url}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                      priority
                    />
                  </div>
                )}
              </article>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-4 my-10">
        {!isFirstPage && (
          <Link
            href={`/?page=${page - 1}${
              search ? `&search=${encodeURIComponent(search)}` : ""
            }`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Назад
          </Link>
        )}

        <span className="px-4 py-2 text-gray-600">
          Сторінка {page} з {totalPages}
        </span>

        {!isLastPage && (
          <Link
            href={`/?page=${page + 1}${
              search ? `&search=${encodeURIComponent(search)}` : ""
            }`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Далі
          </Link>
        )}
      </div>
    </>
  );
}
