import { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";
import { type VideoResponseDto } from "../../types/VideoResponseDto";
import VideoBlock from "../../components/video/VideoBlock";
import VideoPlayerModal from "../../components/video/VideoPlayerModal";

export default function VideoList() {
  const [videos, setVideos] = useState<VideoResponseDto[]>([]);
  const [desc, setDesc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoResponseDto | null>(null);

  useEffect(() => {
    api.get("/videos/list")
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => console.error("동영상을 불러올 수 없습니다.", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">불러오는 중...</div>;

  return (
    <div className="relative w-full max-w-5xl p-4 mx-auto space-y-4 bg-base-200 rounded-xl">
      {/* 헤더 영역 */}
      <div className="flex flex-row items-center">
        <h1 className="flex-1 mx-2 mb-4 text-2xl font-bold">동영상 목록</h1>
        <button
          className="mx-2 mb-4 btn"
          onClick={() => {
            setDesc(!desc);
            setVideos((prev) => [...prev].reverse());
          }}
        >
          {desc === true ? "보는 중: 최신" : "보는 중: 이전"}
        </button>
      </div>

      {/* 목록 비었을 때 */}
      {videos.length === 0 && (
        <p className="px-2 text-base-content/60">등록된 동영상이 없습니다.</p>
      )}

      {/* 바둑판 방식 그리드 레이아웃 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 place-items-start">
        {videos.map((video) => (
          <VideoBlock key={video.videoId} video={video}
          onClick={() => setSelectedVideo(video)} />
        ))}
      </div>
      <VideoPlayerModal video={selectedVideo}
      onClose={() => setSelectedVideo(null)} />
    </div>
  );
}
