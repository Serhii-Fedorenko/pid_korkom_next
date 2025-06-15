export async function generateMetadata({ params }) {
  const { articleId } = await params;
  const BASE_URL = "https://pid-korkom-api.onrender.com/api/articles";
  const article = await fetch(`${BASE_URL}/${articleId}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());
  return {
    title: article.title,
    description: article.text.slice(0, 150)
  }
}

export default async function CurrentArticlePage({ params }) {
  const { articleId } = await params;
  const BASE_URL = "https://pid-korkom-api.onrender.com/api/articles";
  const article = await fetch(`${BASE_URL}/${articleId}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article>
        <h1 className="text-3xl font-bold mb-4">{article?.title}</h1>
        <p className="text-gray-700 mb-6">{article?.text}</p>
        {article?.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full max-h-[500px] object-cover rounded"
          />
        )}
      </article>
    </div>
  );
}
