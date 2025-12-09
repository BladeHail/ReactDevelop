import { useNavigate, useParams } from "react-router-dom";
import YtPlayer from "../components/Stream/YtPlayer";

export default function LivePage() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  if(videoId === undefined) {
    return(
    <div className="bg-base-100">
        <h1 className="text-2xl font-bold m-4">영상을 찾을 수 없었습니다.</h1>
    </div>
    );
  }
  return (
    <div className="w-full max-w-3xl bg-base-200 mx-auto p-4 space-y-4 rounded-xl flex flex-col">
      <h1 className="mx-2 text-2xl font-bold mb-4">라이브스트리밍</h1>
      <button className="btn btn-primary p-4 text-xl font-bold bg-base-100" onClick={() => navigate('/live')}>←라이브 목록</button>
      <YtPlayer videoId={videoId}/>
    </div>
  );
}
