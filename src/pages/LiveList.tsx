import { useEffect, useState } from "react";
import { api } from "../api/axiosInstance";
import type { LiveDto } from "../types/LiveDto";
import { useNavigate } from "react-router-dom";

export default function LivePage() {
  const [onLive, setOnLive] = useState(false);
  const [videos, setVideos] = useState<LiveDto[]>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/live-status")
      .then((res) => {
        setOnLive(res.data.isLive);
        setVideos(res.data.videos ?? null);
        })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">불러오는 중...</div>;

  return (
    <div className="w-full max-w-3xl bg-base-200 mx-auto p-4 space-y-4 rounded-xl">
      <h1 className="mx-2 text-2xl font-bold mb-4">라이브스트리밍</h1>
      {!onLive && (
        <p className="text-base-content/60">현재 진행 중인 생중계가 없습니다.</p>
      )}
      <div className="w-full flex-col">
        {videos != undefined && videos.map(video => (
          <a className="card bg-base-100 shadow cursor-pointer m-4" onClick={() => navigate(`/live/${video.videoId}`)}>
            <div className="card-body p-4">
              <h3 className="text-2xl text-center font-bold">{video.title}</h3>
              <p className="text-center">{video.channelName}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
{/* <a onClick={() => navigate(`/live/${videos}`)}>{videos[0].title}</a> */}