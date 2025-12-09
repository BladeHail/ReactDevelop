import { useState } from "react";
import PostList from "./PostList";
import PostWriter from "./PostWriter";

export default function PostBox({playerId} : {playerId : number}) {
    const [refreshToken, setRefreshToken] = useState(0);

      // PostWriter가 호출
      const handlePostCreated = () => {
        console.log(refreshToken);
        setRefreshToken((t) => t + 1);  // 변경 시 PostList는 새로 fetch
      };
    return(
        <div>
            <PostList playerId={playerId} refresh={refreshToken} />
            <PostWriter playerId={playerId} onSuccess={handlePostCreated} />
        </div>
    )
}