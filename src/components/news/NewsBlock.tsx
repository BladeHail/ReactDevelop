import type { NewsDto } from "../../types/NewsDto";

export default function NewsBlock({news} : {news : NewsDto}) {
    return (
      <a className="card bg-base-100 shadow-lg p-5 border border-base-300 mt-4">
        <div>
          <h1 className="text-2xl font-bold">{news.title}</h1>
          <p className="text-base-content/60 text-sm mt-1">
            {news.pubDate/*new Date(news.pubDate).toLocaleString()*/}
          </p>

          {news.description ? (
            <p className="font-semibold mt-3">
              {news.description}
            </p>
          ) : (
            <div>
              {
                news.title
              }
            </div>
          )}
        </div>
    </a>
  );
}