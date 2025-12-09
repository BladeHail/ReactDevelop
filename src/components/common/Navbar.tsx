import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Dropdown } from "./Dropdown";

export function Navbar() {
  const { isLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-200 shadow relative">

      {/* Hover 메뉴 그룹 */}
      <div className="flex-1">
        <div className="mx-4 relative inline-block rounded-md bg-base-300 group">
        {/* Anchor 역할 */}
        <a className="text-xl cursor-pointer">☰ </a>
        <a
          className="font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          Paralympic Studio
        </a>
        {/* Hover Dropdown */}
        <Dropdown />
        </div>
      </div>

      {/* 로그인 / 로그아웃 영역 */}
      <div className="flex-none gap-3">
        {isLoggedIn && localStorage.getItem('token') ? (
          <>
            <span className="font-semibold">{username?.split('@')[0]}님 </span>
            <button className="btn btn-sm" onClick={logout}>
              로그아웃
            </button>
          </>
        ) : (
          <button className="btn btn-sm" onClick={() => navigate("/login")}>
            로그인
          </button>
        )}
      </div>
    </div>
  );
}
