import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/axiosInstance";
import type { Block } from "../../types/Blocks";
import type { MatchDto } from "../../types/MatchDto";
import PredictionCard from "../../components/predictions/PredictionCard";
import YtPlayer from "../../components/Youtube/YtPlayer";

export default function PostViewPage() {
    const [post, setPost] = useState<any>(null); //PostDto 타입이 아직 없으므로 any 사용, 지금은 이렇게 사용하지만 안 된다는 걸 알아야 함
    const [loading, setLoading] = useState(true);
    const [hideContent, setHideContent] = useState(false);
    const [prediction, setPrediction] = useState<MatchDto[]>([]);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
      api.get(`/posts/${id}`).then(res => {
        setPost(res.data);
      });
      api.get("/predictions/matches").then(res => {
        setPrediction(res.data);
      }).finally(() => setLoading(false));
    }, []);
    const sortedBlocks = post?.blocks
  .slice()
  .sort((a : Block, b: Block) => parseInt(a.id) - parseInt(b.id));
  if (loading) {
    return <div className="text-center">불러오는 중...</div>;
  }

  if (!post || prediction.length === 0) {
    return <div className="text-center">글을 불러올 수 없습니다.</div>;
  }

  return (
    <div>
      <article className="max-w-5xl mx-auto px-4 py-6 rounded-xl bg-base-200 space-y-6">
        <div className="flex">
          <h1 className="mx-2 text-2xl font-bold mb-4 flex flex-1">
            {post.title}
          </h1>
          <button className="btn btn-primary p-2 bg-base-100" onClick={() => navigate("/posts")}>뒤로</button>
        </div>
        <div className="divider"/>
        <div className="flex">
          <div className="flex flex-1 text-xl font-bold pl-4"></div>
          <button className="btn btn-primary p-2" onClick={() => {setHideContent(!hideContent)}}>{hideContent === true ? "본문 펼치기" : "본문 숨기기"}</button>
        </div>
        <div className="space-y-4 p-4 bg-base-100 rounded-lg text-base-content">
          {hideContent === true ? <div className="text-center font-bold text-5xl">...</div> : sortedBlocks.map((block : any) => { //TextBlock으로 가정, 추후 확장
            if (block.type === "text") {
              return (
                <p
                  key={block.id}
                  className="whitespace-pre-wrap leading-relaxed"
                >
                  {block.content}
                </p>
              );
            }
            if(block.type === "prediction") {
              return <a className="cursor-pointer" key={block.id} onClick={() => navigate("/predictions")}><PredictionCard key={block.id} match={prediction.find(p => p.id === parseInt(block.matchId))!} interactive={false} /></a>;
            }
            if(block.type === "live") {
              return <YtPlayer key={block.id} videoId={block?.videoId} auto={true} />;
            }
            if(block.type === "video") {
              return <YtPlayer key={block.id} videoId={block?.videoId} auto={false} />; //거의 같지만 자동 재생만 방지
            }
          })}
        </div>
        <div className="text-center">댓글(미구현)</div>
      </article>
    </div>
  );
}