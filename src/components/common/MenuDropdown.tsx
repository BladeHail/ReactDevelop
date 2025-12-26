import { useNavigate } from "react-router-dom";

export function MenuDropdown() {
    const navigate = useNavigate();
    return(<div
          className="absolute left-0 z-50 flex-col hidden border shadow-xl group-hover:flex w-44 bg-base-100 text-base-content rounded-xl border-base-300"
        >
          <button
            className="px-4 py-3 text-left hover:bg-base-200"
            onClick={() => navigate("/players")}
          >
            선수 목록
          </button>

          <button
            className="px-4 py-3 text-left hover:bg-base-200"
            onClick={() => navigate("/predictions")}
          >
            승부예측
          </button>

          <button
            className="px-4 py-3 text-left hover:bg-base-200 rounded-b-xl"
            onClick={() => navigate("/posts")}
          >
            게시판
          </button>

          <button
            className="px-4 py-3 text-left hover:bg-base-200 rounded-b-xl"
            onClick={() => navigate("/videos")}
          >
            동영상
          </button>

          <button
            className="px-4 py-3 text-left hover:bg-base-200 rounded-b-xl"
            onClick={() => navigate("/live")}
          >
            생중계
          </button>
          
          <button
            className="px-4 py-3 text-left hover:bg-base-200 rounded-b-xl"
            onClick={() => navigate("/news")}
          >
            뉴스
          </button>
        </div>)
}