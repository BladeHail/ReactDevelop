import { useNavigate } from "react-router-dom";

export function Dropdown() {
    const navigate = useNavigate();
    return(<div
          className="hidden group-hover:flex flex-col absolute left-0 top-full w-44 bg-base-100 text-base-content rounded-xl shadow-xl z-50 border border-base-300"
        >
          <button
            className="text-left px-4 py-3 hover:bg-base-200"
            onClick={() => navigate("/players")}
          >
            선수 목록
          </button>

          <button
            className="text-left px-4 py-3 hover:bg-base-200"
            onClick={() => navigate("/predictions")}
          >
            승부예측
          </button>

          <button
            className="text-left px-4 py-3 hover:bg-base-200 rounded-b-xl"
            onClick={() => navigate("/live")}
          >
            생중계
          </button>
          
          <button
            className="lg:hidden text-left px-4 py-3 hover:bg-base-200"
            onClick={() => navigate("/news")}
          >
            뉴스
          </button>
        </div>)
}