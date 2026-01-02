import { useNavigate } from "react-router-dom";

interface DropdownProps {
  isOpen?: boolean;
  close?: () => void;
}

export function MenuDropdown({ isOpen, close }: DropdownProps) {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
    close?.(); // 모바일에서만 닫힘
  };
    return(
      <div
        className={`
          absolute left-0 z-50 flex-col border shadow-xl w-44
          bg-base-100 text-base-content rounded-xl border-base-300
          ${isOpen ? "flex" : "hidden"}
          md:group-hover:flex md:hidden
        `}
      >
          <button
            className="px-4 py-3 text-left hover:bg-base-200"
            onClick={() => handleNavigate("/players")}
          >
            선수 목록
          </button>

          <button
            className="px-4 py-3 text-left hover:bg-base-200"
            onClick={() => handleNavigate("/predictions")}
          >
            승부예측
          </button>

          <button
            className="px-4 py-3 text-left hover:bg-base-200 rounded-b-xl"
            onClick={() => handleNavigate("/posts")}
          >
            게시판
          </button>

          <button
            className="px-4 py-3 text-left hover:bg-base-200 rounded-b-xl"
            onClick={() => handleNavigate("/videos")}
          >
            동영상
          </button>

          <button
            className="px-4 py-3 text-left hover:bg-base-200 rounded-b-xl"
            onClick={() => handleNavigate("/live")}
          >
            생중계
          </button>
          
          <button
            className="px-4 py-3 text-left hover:bg-base-200 rounded-b-xl"
            onClick={() => handleNavigate("/news")}
          >
            뉴스
          </button>
        </div>)
}