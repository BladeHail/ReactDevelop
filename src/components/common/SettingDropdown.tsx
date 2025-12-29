import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function SettingDropdown() {
    const {logout} = useAuth();
    const navigate = useNavigate();
    return(<div
          className="hidden group-hover:flex flex-col absolute right-0 w-44 bg-base-100 text-base-content rounded-xl shadow-xl z-50 border border-base-300"
        >
          <button
            className="text-left px-4 py-3 hover:bg-base-200"
            onClick={logout}>
              로그아웃
            </button>

          <button
            className="text-left px-4 py-3 hover:bg-base-200"
            onClick={() => navigate("/my")}
          >
            내 정보
          </button>
        </div>)
}