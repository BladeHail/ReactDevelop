import type { BoardDto } from "../../types/BoardDto";
import getName from "../../utils/getName";

export default function PostElement({comment, interactive = true} : {comment : BoardDto, interactive: boolean}) {
    return (
    <div className="flex flex-row justify-between card bg-base-100 shadow-lg p-4 border border-base-300 mt-4">
      <div className="flex flex-col flex-1">
        <h1 className="text-xl md:text-3xl font-bold">{comment.content}</h1>
        <p className="text-base-content/60 text-sm mt-1">{getName(comment.author)}, {new Date(comment.createdAt).toLocaleString()}</p>
      </div>
      {interactive === true ? <span className="flex flex-col justify-center">
        <button className="btn btn-primary p-2">수정</button>
        <button className="btn btn-error p-2">삭제</button>
      </span> : <div></div>}
    </div>
  );
}