import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const BASE_URL = "https://pid-korkom-api.onrender.com/api/articles";
  const res = await fetch(BASE_URL, { next: { revalidate: 60 } }).then((res) =>
    res.json()
  );

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-10 tracking-tight">
        Головна сторінка
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto px-4">
        {res.map((article) => (
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
                      src={article.image}
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
    </>
  );
}
