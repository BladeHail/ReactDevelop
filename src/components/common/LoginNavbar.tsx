import { useAuth } from "../../hooks/useAuth";

export function LoginNavbar() {
  const { isLoggedIn, username, point } = useAuth();

  return (
    <div className="navbar bg-base-200 shadow relative">
      {/* Hover 메뉴 그룹 */}
      <div className="flex-1">
        <div className="inline-block">
          <div className="mx-4 relative flex gap-2 lg:gap-4 rounded-md bg-base-300">
          {/* Anchor 역할 */}
          <h1
            className="font-bold text-xl cursor-pointer"
          >
            Paralympic Studio
          </h1>
        </div>
        {/* Hover Dropdown */}
        </div>
      </div>

      {/* 로그인 / 로그아웃 영역 */}
      <div className="flex-none gap-3 group">
        {isLoggedIn && 
        <span className="font-semibold flex flex-row">
          <div className="flex flex-col">
            <div className="text-xl">{username?.split('@')[0]}님</div> 
            <div>({point !== null ? point : 0} 포인트)</div>
          </div> 
          <a className="m-2 lg:my-0 text-xl cursor-pointer">☰</a> 
        </span>
        }
        {/*isLoggedIn && localStorage.getItem('token') ? (
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
        )*/}
      </div>
    </div>
  );
}
