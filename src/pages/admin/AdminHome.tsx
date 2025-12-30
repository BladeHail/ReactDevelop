import { useEffect, useRef, useState } from "react";
import { api } from "../../api/axiosInstance";
import AnchorBar from "../../components/Home/Anchor";
import type { FeedDto } from "../../types/FeedDto";
import AdminFeed from "../../components/Home/AdminFeed";
import { HEADER_IMAGES } from "../../../public/para/headerImages";

export default function AdminHome() {
  const init = useRef(true);
  const [feedItems, setFeedItems] = useState<FeedDto[]>([]);
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % HEADER_IMAGES.length);
        setIsFading(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { // On Initial Load
    api.get('/feed').then(res => {
      setFeedItems(res.data);
    }).catch((err : any) => {
      console.error(err);
    }).finally(() => {
      init.current = false;
    });
  }, []);

  if(feedItems.length === 0) {
    return <div className="text-center py-10">로딩 중...</div>;
  }
  return (
    <div className="max-w-5xl mx-auto space-y-4">
        <div className="bg-base-200 rounded-xl shadow text-base-content/60">
            <div className="flex flex-col">
                <div className="relative w-full h-80 overflow-hidden rounded-t-xl">
                  <img
                    key={index}
                    src={HEADER_IMAGES[index]}
                    className={`
                      absolute inset-0 w-full h-full object-cover
                      transition-transform
                      transition-opacity duration-500 ease-in-out
                      ${isFading ? "opacity-0" : "opacity-100"}
                    `}
                  />
                  {/* 다음 이미지 (항상 새 노드) */}
                  <img
                    key={`next-${index}`}
                    src={HEADER_IMAGES[(index + 1) % HEADER_IMAGES.length]}
                    className={`
                      absolute inset-0 w-full h-full object-cover
                      opacity-0`}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30" />
                    
                  {/* Title */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end">
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-gray-200 drop-shadow-lg">
                      Paralympic Studio
                    </h1>
                    <div className="flex p-2 bg-transparent">
                      <AnchorBar/>
                    </div>
                  </div>
                </div>
            </div>
            <div className="divider" />
            <div className="rounded-xl shadow p-6">
                <AdminFeed feedItems={feedItems} />
            </div>
        </div>
    </div>
  );
}
