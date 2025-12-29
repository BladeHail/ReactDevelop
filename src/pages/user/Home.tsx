import { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";
import AnchorBar from "../../components/Home/Anchor";
import type { FeedDto } from "../../types/FeedDto";
import FeedList from "../../components/Home/FeedList";

export default function Home() {
  const [feedItems, setFeedItems] = useState<FeedDto[]>([]);
  useEffect(() => { // On Initial Load
    api.get('/feed').then(res => {
      setFeedItems(res.data);
    }).catch((err : any) => {
      console.error(err);
    });
  }, []);
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="bg-base-200 rounded-xl shadow text-base-content/60">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Paralympic Studio</h1>
        <AnchorBar col={false} />
      </div>
        <div className="my-6 rounded-xl shadow p-6">
          <FeedList feedItems={feedItems} />
        </div>
      </div>
    </div>
  );
}
