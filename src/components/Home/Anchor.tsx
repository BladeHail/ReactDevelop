import { useNavigate } from "react-router-dom";
import live from "../../assets/live.svg";
import video from "../../assets/video.svg";
import news from "../../assets/news.svg";
import profile from "../../assets/profile.svg";
import prediction from "../../assets/prediction.svg";
import post from "../../assets/post.svg";

export default function AnchorBar({col = false} : {col: boolean}) {
    const navigate = useNavigate();
    return(
        <div className={`w-full h-16 bg-base-200 flex flex-col items-center justify-center`}>
            <div className={`flex ${col ? 'flex-col' : 'flex-row'} gap-2`}>
                <button className="btn p-2 bg-base-100" onClick={() => navigate("/players")}>
                    <img src={profile} alt="profile" className="w-6 h-6"/>
                    <h1>선수 목록</h1>
                </button>
                <button className="btn p-2 bg-base-100" onClick={() => navigate("/predictions")}>
                    <img src={prediction} alt="prediction" className="w-6 h-6"/>
                    <h1>승부예측</h1>
                </button>
                <button className="btn p-2 bg-base-100" onClick={() => navigate("/posts")}>
                    <img src={post} alt="post" className="w-6 h-6"/>
                    <h1>게시판</h1>
                </button>
                <button className="btn p-2 bg-base-100" onClick={() => navigate("/videos")}>
                    <img src={video} alt="video" className="w-6 h-6"/>
                    <h1>동영상</h1>
                </button>
                <button className="btn p-2 bg-base-100" onClick={() => navigate("/live")}>
                    <img src={live} alt="live" className="w-6 h-6"/>
                    <h1>생중계</h1>
                </button>
                <button className="btn p-2 bg-base-100" onClick={() => navigate("/news")}>
                    <img src={news} alt="news" className="w-6 h-6"/>
                    <h1>뉴스</h1>
                </button>
            </div>
            <div className="divider" />
        </div>
    )
}