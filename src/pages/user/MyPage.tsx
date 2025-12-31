import { api } from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import type { UserDto } from "../../types/UserDto";
import getName from "../../utils/getName";
import type { PredictDto } from "../../types/PredictDto";
import type { BoardDto } from "../../types/BoardDto";
import MyPrediction from "../../components/my/MyPrediction";
import MyBoard from "../../components/my/MyBoard";
import MyPost from "../../components/my/MyPost";
import Galaxy from "../../../public/galaxy.jpg";
import type { PostSummary } from "../../types/Post";

export default function MyPage() {
    const [user, setUser] = useState<UserDto | null>(null);
    const [myPre, setMyPre] = useState<PredictDto[] | null>(null);
    const [myBrd, setMyBrd] = useState<BoardDto[] | null>(null);
    const [myPost, setMyPost] = useState<PostSummary[] | null>(null);
    const [openPre, setOpenPre] = useState(true);
    const [openBrd, setOpenBrd] = useState(true);
    const [openPost, setOpenPost] = useState(true);
    const [loading, setLoading] = useState(true);
    const handleProvider = (provider: string ) => {
        if(user?.admin === true && user?.username === 'admin') return "관리자";
        switch(provider){
            case "GOOGLE":
                return "Google 유저";
                break;
            case "KAKAO":
                return "Kakao 유저";
                break;
            case "NAVER":
                return "Naver 유저";
                break;
            case "LOCAL":
                return "일반 유저";
                break;
            default:
                return "?";
                break;
        }
    }
  useEffect(() => {
    api.get("user/my")
    .then((res) => {
      setUser(res.data);
    })
    .catch((e: any) => {console.error(e);});
    api.get("predictions/my")
    .then((res => {
      setMyPre(res.data);
    }))
    .catch((e: any) => console.error(e));
    api.get("posts/my")
    .then((res => {
      setMyPost(res.data);
    }))
    .catch((e: any) => console.error(e));
    api.get("boards/my")
    .then((res => {
      setMyBrd(res.data);
    }))
    .catch((e: any) => console.error(e))
    .finally(() =>{
      setLoading(false);
    });
  }, []);
  // Should require this many?

  if (loading) {
    return <div className="p-6">불러오는 중...</div>;
  }
  if(user === null || myPre === null || myBrd === null) {
    return <div>올바르지 않은 정보</div>;
  }
  return (
    <main className="w-full max-w-5xl mx-auto flex flex-col gap-6 p-4 lg:p-6">
          <header>
            <div className="bg-base-200 rounded-xl shadow h-max-10 flex flex-col items-center text-center">
              <div className="w-full overflow-hidden rounded-t-xl">
                <div className="h-64">
                  <img className="w-full h-full object-cover object-center" src={Galaxy} alt="프로필 이미지"/>
                </div>
              </div>
              <div className="pb-8">
                <h1 className={user.admin === true ? "text-3xl md:text-6xl font-bold text-blue-600 m-4" : "text-3xl md:text-6xl font-bold m-4"}>{getName(user.email, user.username)}</h1>
                <p className="text-xl">{handleProvider(user.provider)}</p>
                <p className="text-xs">{user.email !== null ? user.email : "이메일 없음"}</p>
              </div>
            </div>
          </header>
          <section id="my-predictions">
            <div className="rounded-xl text-2xl font-bold bg-base-200 p-4 mt-1">
              <div className="flex">
                <div className="flex-1">내 승부예측</div>
                <div className="btn btn-lg text-2xl mb-2" onClick={() => setOpenPre(!openPre)}>{openPre === true ? "접기" : "펼치기"}</div>
              </div>
              {(myPre !== null && openPre) ? myPre.map(predict => <MyPrediction key={predict.id} predict={predict}/>) : <div className="text-center">...</div>}
            </div>
          </section>
          <section id="my-posts">
            <div className="rounded-xl text-2xl font-bold bg-base-200 p-4 mt-1">
              <div className="flex">
                <div className="flex-1">내 게시글</div>
                <div className="btn btn-lg text-2xl mb-2" onClick={() => setOpenPost(!openPost)}>{openPost === true ? "접기" : "펼치기"}</div>
              </div>
              {(myPost?.length !== 0 && openPost) ? myPost?.map(predict => <MyPost key={predict.id} post={predict}/>) : <div className="text-center">...</div>}
            </div>
          </section>
          <section id="my-boards">
            <div className="rounded-xl text-2xl font-bold bg-base-200 p-4 mt-1">
              <div className="flex">
                <div className="flex-1">내 응원 글</div>
                <div className="btn btn-lg text-2xl mb-2" onClick={() => setOpenBrd(!openBrd)}>{openBrd === true ? "접기" : "펼치기"}</div>
              </div>
              {(myBrd.length !== 0 && openBrd) ? myBrd.map(predict => <MyBoard key={predict.id} post={predict}/>) : <div className="text-center">...</div>}
            </div>
          </section>
    </main>
  );
}
