import Link from "next/link";

export default async function Home() {
  const BASE_URL = "https://pid-korkom-api.onrender.com/api/articles";
  const res = await fetch(BASE_URL,{ next: { revalidate: 60 } }).then((res) => res.json());

  return (
    <>
      <h1>Home Page</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {res &&
          res.map((article) => (
            <li
              key={article._id}
              className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <Link href={`/articles/${article.slug}`} className="block p-4">
                <article>
                  <h3 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{article.text}</p>
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                </article>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
