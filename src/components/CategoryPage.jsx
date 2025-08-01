import Image from "next/image";
import Link from "next/link";

export default async function CategoryPage({ category }) {
  const BASE_URL = "https://pid-korkom-api.onrender.com/api/articles";
  const res = await fetch(`${BASE_URL}?category=${category}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  const articles = res.articles;

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto px-4">
        {articles.map((article) => (
          <li
            key={article._id}
            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden bg-white"
          >
            <Link href={`/articles/${article.slug}`} className="block p-4">
              <article>
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <h3 className="text-sm text-gray-700 mb-4 line-clamp-4">
                  {article.description}
                </h3>
                {article.image?.url && (
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
    </>
  );
}
