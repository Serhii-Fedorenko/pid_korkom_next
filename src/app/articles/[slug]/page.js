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
        {article?.image && (
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <figure className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg h-[400px]">
              <Image
                src={article.image.url}
                alt={article.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              <figcaption className="absolute bottom-0 right-0 px-2 py-1 bg-[rgba(0,0,0,0.5)] text-white text-sm">
                {article.image.caption}
              </figcaption>
            </figure>
          </div>
        )}
        <p>{article?.text}</p>
      </article>
    </div>
  );
}
