import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface DropdownProps {
  isOpen?: boolean;
  close?: () => void;
}

export function SettingDropdown({ isOpen, close }: DropdownProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleNavigate = (path: string) => {
    navigate(path);
    close?.(); // 모바일에서만 닫힘
  };
    return(
      <div
        className={`
          absolute right-0 z-50 flex-col border shadow-xl w-44
          bg-base-100 text-base-content rounded-xl border-base-300
          ${isOpen ? "flex" : "hidden"}
          md:group-hover:flex md:hidden
        `}
      >
        {/*<div
          className="hidden group-hover:flex flex-col absolute right-0 w-44 bg-base-100 text-base-content rounded-xl shadow-xl z-50 border border-base-300"
        >*/}
          <button
            className="text-left px-4 py-3 hover:bg-base-200"
            onClick={logout}>
              로그아웃
            </button>

          <button
            className="text-left px-4 py-3 hover:bg-base-200"
            onClick={() => handleNavigate("/my")}
          >
            내 정보
          </button>
        </div>)
}