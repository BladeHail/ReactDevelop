import { useEffect, useState } from "react";
import { api } from "../api/axiosInstance";
import {type NewsDto} from "../types/NewsDto";
import NewsBlock from "../components/news/NewsBlock";

export default function NewsListPage() {
  const [news, setNews] = useState<NewsDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/news/olympic")
      .then((res) => setNews(res.data.items))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">불러오는 중...</div>;

  return (
    <div className="w-full max-w-3xl bg-base-200 mx-auto p-4 space-y-4 rounded-xl">
      <h1 className="mx-2 text-2xl font-bold mb-4">늬우스</h1>

      {news.length === 0 && (
        <p className="text-base-content/60">뉴스를 받아올 수 없었습니다.</p>
      )}
      {/* TODO: Add news blocks(Side & Main) */}
      {news.map((nw) => (
        <NewsBlock key={nw.id} news={nw} />
      ))}
    </div>
  );
}
