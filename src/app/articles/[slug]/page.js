import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const BASE_URL = "https://pid-korkom-api.onrender.com/api/articles/slug";
  const article = await fetch(`${BASE_URL}/${slug}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());
  return {
    title: article.title,
    description: article.text.slice(0, 150),
  };
}

export default async function CurrentArticlePage({ params }) {
  const { slug } = await params;
  const BASE_URL = "https://pid-korkom-api.onrender.com/api/articles/slug";
  const article = await fetch(`${BASE_URL}/${slug}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <article className="prose lg:prose-lg max-w-none">
        <h1>{article?.title}</h1>
        <p>{article?.text}</p>
        {article?.image && (
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
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
    </div>
  );
}
