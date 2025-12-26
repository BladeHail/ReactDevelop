import { useNavigate } from "react-router-dom";
import type { BoardDto } from "../../types/BoardDto";
import PostElement from "../board/PostElement";

export default function MyPrediction({post} : {post: BoardDto}){
    const navigate = useNavigate();
    return(
        <a className="cursor-pointer" onClick={ () => navigate(`/players/${post.playerId}#comment`)}>
                <PostElement comment={post} interactive={false}/>
            </a>
    )
}