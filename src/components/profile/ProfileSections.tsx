// src/components/Main/ProfileSections.tsx
import { useState } from "react";
import {type Player} from "../../types/Player"
import PostBox from "../post/PostBox";

export default function ProfileSections({player}: {player : Player}) {
  const [open, setOpen] = useState(true);
  const enclose = () => setOpen(open !== true)
  return (
    <section className="space-y-6">
      <div className="bg-base-200 rounded-xl shadow p-6">
        <div className="flex">
          <h2 className="text-2xl lg:text-4xl font-semibold flex-1">수상 경력</h2>
          <div className="text-lg btn m-4 mt-0 bg-base-100" onClick={enclose}>펼치기/접기</div>
        </div>
        <div className="divider my-4"></div>
        <ul className="list-disc ml-6 mt-2 text-lg text-base-content/70">
          {open === true ? player.awards?.map((award, idx) => {
            const isDivider = award.trim().startsWith("─");
            const isEmpty = award.trim() === "";
            return (
              <li 
                key={idx} 
                className={`
                  mb-1 
                  ${(isEmpty || isDivider) ? "list-none" : ""} 
                  ${isDivider ? "text-2xl font-bold text-base-content mt-6 mb-2" : ""}
                `}
              >
                {award || <br />}
              </li>
            );
          }) : <li className="list-none"></li>}
        </ul>
      </div>
      <div className="bg-base-200 rounded-xl shadow p-6">
        <div className="flex">
          <h2 className="text-2xl lg:text-4xl font-semibold flex-1">응원 글</h2>
          {/* <div className="text-lg btn m-4 mt-0 bg-base-100" onClick={enclose}>펼치기/접기</div> */}
        </div>
        <div className="divider my-4"></div>
        <PostBox playerId={player.id} />
      </div>
    </section>
  );
}
