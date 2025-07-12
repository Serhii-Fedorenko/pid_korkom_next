import Image from "next/image";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata({ params }) {
  try {
    const { slug } = params;
    const BASE_URL = "https://pid-korkom-api.onrender.com/api/articles/slug";
    const res = await fetch(`${BASE_URL}/${slug}`, {
      next: { revalidate: 60 },
    });
    const article = await res.json();
    return {
      title: article.title,
      description: article.text.slice(0, 150),
    };
  } catch (error) {
    return {
      title: "Стаття не знайдена",
      description: "Ми не змогли знайти цю статтю.",
    };
  }
}

export default async function CurrentArticlePage({ params }) {
  const { slug } = await params;
  const BASE_URL = "https://pid-korkom-api.onrender.com/api/articles/slug";
  const article = await fetch(`${BASE_URL}/${slug}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  function parseTextWithParagraphs(text) {
    if (!text || typeof text !== "string") {
      return "";
    }

    const linked = text.replace(
      /\[\[([^\|\]]+)\|([^\]]+)\]\]/g,
      '<a href="/articles/$2" class="text-blue-600 underline hover:text-blue-800">$1</a>'
    );

    return linked
      .split(/\n{2,}/)
      .map(function (p) {
        return (
          '<p className="indent-8">' + p.trim().replace(/\n/g, "<br/>") + "</p>"
        );
      })
      .join("");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <article className="prose lg:prose-lg max-w-none">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center max-w-2xl mx-auto text-gray-900">
          {article?.title}
        </h1>
        {article?.image && (
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg my-10">
            <figure className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg h-[400px]">
              <Image
                src={article && article.image.url}
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
        <div
          className="prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: parseTextWithParagraphs(article.text),
          }}
        />
      </article>
    </div>
  );
}
