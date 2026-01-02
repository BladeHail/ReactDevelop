import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { MenuDropdown } from "./MenuDropdown";
import { SettingDropdown } from "./SettingDropdown";
import home from "../../assets/home.svg";
import { textLimiter } from "../../utils/textLimiter";
import { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const { isLoggedIn, username, point } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-200 shadow relative">
      {/* Hover 메뉴 그룹 */}
      <div className="flex-1">
        <div className="inline-block">
          <div className="mx-4 relative flex md:gap-2 lg:gap-4 rounded-md bg-transparent">
            <div className="group flex-row md:flex-none">
              {/* 모바일: 클릭 */}
              <button
                className="my-2 mx-1 text-xl md:hidden"
                onClick={() => {setSettingOpen(false); setMenuOpen(v => !v)}}
              >
                ☰
              </button>
              {/* 데스크톱: hover */}
              <span className="my-2 md:mx-2 text-xl hidden md:inline">☰</span>
              <span
                className="my-2 font-bold text-xl"
                onClick={() => navigate("/")}
              >
                Paralympic Studio
              </span>
              <MenuDropdown
                isOpen={menuOpen}
                close={() => setMenuOpen(false)}
              />
            </div>
            <div className="flex flex-col justify-center">
              <img src={home} alt="profile" className="w-6 h-6 mt-1 cursor-pointer" onClick={() => {setMenuOpen(false); setSettingOpen(false); navigate("/")}}/>
            </div>
        </div>
        {/* Hover Dropdown */}
        </div>
      </div>

      {/* 로그인 / 로그아웃 영역 */}
      <div className="flex-none gap-3 group">
        {isLoggedIn && 
        <span className="font-semibold flex flex-row">
          <div className="flex flex-col">
            <div className="text-xl md:hidden">{username !== null ? textLimiter(username?.split('@')[0], 5) + "님" : "로그인"}</div>
            <div className="text-xl hidden md:block">{username !== null ? textLimiter(username?.split('@')[0], 20) + "님" : "로그인이 필요합니다."}</div> 
            <div>({point !== null ? point : 0} 포인트)</div>
          </div> 
          <button
                className="my-2 mx-1 text-xl"
                onClick={() => {setMenuOpen(false); setSettingOpen(v => !v)}}
              >
                ☰
              </button>
        </span>
        }
        <SettingDropdown isOpen={settingOpen} close={() => setSettingOpen(false)} />
      </div>
    </div>
  );
}
