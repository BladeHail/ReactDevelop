import { api } from "../../api/axiosInstance";
import type { BoardDto } from "../../types/BoardDto";
import getName from "../../utils/getName";
import { useState } from "react";

export default function CommentElement({comment, interactive = true} : {comment : BoardDto, interactive: boolean}) {
  const [hidden, setHidden] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [isYourComment, setIsYourComment] = useState<"yes" | "no" | "not yet">("not yet");
  const [content, setContent] = useState(comment);
  const [input, setInput] = useState(comment.content);
  const submit = async () => {
    try {
      await api.put(`/boards/${content.playerId}`, {
        title: `${content.playerId}_comment`,
        content: input,
      });
      //navigate(`/players/${playerId}/boards`);
    } catch (err) {
      console.error(err);
    } finally {
      setOnEdit(false);
      setContent({...content, content: input});//임시방편
    }
  };
  const cancel = () => {
    setOnEdit(false);
    setInput(content.content);
  };
  const tryEdit = () => {
    if(isYourComment === "no") {
      return;
    }
    // 수정 모드 진입 시 처리할 내용
    if(isYourComment === "not yet") {
      api.get(`/boards/${comment.id}`)
    .then(() => {
      setIsYourComment("yes");
    })
    .catch(err => {
      console.error(err);
      alert("댓글 정보를 불러올 수 없었습니다.");
      setIsYourComment("no");
      setOnEdit(false);
    });
      }
    setOnEdit(true);
    setInput(content.content);
  };
  const remove = () => {
    const c = confirm("정말로 이 댓글을 삭제하시겠습니까?");
    if(!c) return;
    api.delete(`/boards/${content.playerId}`)
    .then(() => {
      setHidden(true);
    })
    .catch(err => {
      console.error(err);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    });
  }
  if(hidden) return <div></div>;
  return (
    <div className="flex justify-between card bg-base-100 shadow-lg p-4 border border-base-300 mt-4">
      <div className="flex flex-row" >
        <div className="flex flex-col flex-1">
          {onEdit ? 
            <div className="flex flex-col justify-center">
              <div className="form-control flex-1">
                <textarea
                  className=" text-2xl md:text-3xl font-bold resize-none outline-none w-full min-h-20 max-h-40 overflow-x-hidden leading-relaxed bg-transparent border-base-300"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  placeholder="내용을 입력하세요"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 w-full">
                <button className="btn btn-success p-2" onClick={() => {submit()}}>저장</button>
                <button className="btn btn-warning p-2" onClick={() => {cancel()}}>취소</button>
              </div>
            </div> 
            : 
            <div>
              <h1 className="text-xl md:text-3xl font-bold">{content.content}</h1>
              <p className="text-base-content/60 text-sm mt-1">{getName(content.author)}, {new Date(content.createdAt).toLocaleString()}</p>
            </div>}
        </div>
        {!onEdit && interactive === true ? 
        <span className="flex flex-col justify-center">
          <button className="btn btn-primary p-2" onClick={() => {tryEdit()}}>수정</button>
          <button className="btn btn-error p-2" onClick={() => {remove()}}>삭제</button>
        </span> : <div></div>}
      </div>
    </div>
  );
}