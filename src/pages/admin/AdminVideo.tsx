import { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";
import type { VideoResponseDto } from "../../types/VideoResponseDto";
import AdminVideoCard from "../../components/video/AdminVideoCard";
import VideoUploadModal from "../../components/video/VideoUploadModal";

export default function AdminVideo() {
  const [videos, setVideos] = useState<VideoResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchVideos = () => {
    setLoading(true);
    api
      .get("/videos/list")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading && videos.length === 0)
    return <div className="p-6">불러오는 중...</div>;

  return (
    <div className="w-full max-w-5xl p-4 mx-auto space-y-4 bg-base-200 rounded-xl">
      <div className="flex flex-row items-center justify-between">
        <h1 className="mx-2 mt-1 text-2xl font-bold">동영상 관리</h1>
        {/* 버튼 클릭 시 모달 열기 */}
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + 새 영상 업로드
        </button>
      </div>

      {videos.length === 0 && (
        <p className="p-2 text-base-content/60">등록된 동영상이 없습니다.</p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <AdminVideoCard key={video.videoId} video={video} />
        ))}
      </div>

      {/* 업로드 모달 연결 */}
      <VideoUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchVideos}
      />
    </div>
  );
}
