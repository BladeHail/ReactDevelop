import type { BoardDto } from "../../types/BoardDto";
import getName from "../../utils/getName";

export default function PostElement({comment} : {comment : BoardDto}) {
    return (
    <div className="card bg-base-100 shadow-lg p-4 border border-base-300 mt-4">
      <h1 className="text-2xl font-bold">{comment.content}</h1>
      <p className="text-base-content/60 text-sm mt-1">{getName(comment.author)}, {new Date(comment.createdAt).toLocaleString()}</p>
    </div>
  );
}