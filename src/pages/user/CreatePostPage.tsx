import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlockPickerPanel from "../../components/post/BlockPickerPanel";
import { createPredictionEditorBlock, createTextEditorBlock } from "../../utils/createEditorBlock";
import type { AnyEditorBlock } from "../../types/EditorBlocks";
import PredictionCard from "../../components/predictions/PredictionCard";
import { api } from "../../api/axiosInstance";


export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<AnyEditorBlock[]>([
    createTextEditorBlock(),
  ]);

  const [activeBlockKey, setActiveBlockKey] = useState<string | null>(null);
  const [cursorAtEnd, setCursorAtEnd] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTargetKey, setPickerTargetKey] = useState<string | null>(null);
  const navigate = useNavigate();

  //function isVideoBlock(block: Block): block is VideoBlock {
  //  return block.type === "video";
  //}

  /* 제목 */
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  /* text 내용 변경 */
  const updateTextBlock = (key: string, content: string) => {
    setBlocks((prev: AnyEditorBlock[]) =>
      prev.map(b =>
        b.key === key && b.block.type === "text"
          ? { ...b, block: { ...b.block, content } }
          : b
      )
    );
  };

  const returnList = () => {
    if(isPostEmpty()) { //내용이 없으면 그냥 돌아가기
      navigate('/posts');
      return;
    }
    const c = confirm("작성 중인 내용이 사라집니다. 돌아가시겠습니까?");
    if (c) navigate('/posts');
  }
  const isPostEmpty = () => {
    return blocks[0].block.type === "text" // 첫 블록이 텍스트 블록이고(아무 블록도 없을 때 자동 생성됨)
    && blocks[0].block.content.trim() === "" // 그 내용이 비어있고
    && blocks.length === 1; // 텍스트 블록밖에 없을 때
  }
  /* 저장 */
  const handleSubmit = async () => {
    console.log(blocks.length);
    if(title.trim() === "" || title === null) {
      alert("제목을 입력해주세요.");
      return;
    }
    if(blocks.length === 0 || isPostEmpty()) { // 글이 정상적으로 작성된다면 첫 텍스트 블록이 빌 수는 없음
      alert("내용을 입력해주세요.");
      return;
    }
    const payload = {
      title,
      blocks: blocks
        .map(b => b.block)
        .filter(b =>
          !(b.type === "text" && b.content.trim() === "")
        )
        .map((block, index) => {
          if (block.type === "prediction") {
            return {
              id: String(index + 1),
              type: "prediction",
              matchId: block.match?.id,
            };
          }
          return {...block, id: String(index + 1)};
        }),
    };
    console.log("POSTing /posts", payload);
    await api.post("/posts", payload);
  };

  const renderBlock = ({ key, block }: AnyEditorBlock) => {
    if(block.type === "prediction" && block.match !== null) return (
      <div key={key} className="relative">
        {<PredictionCard match={block.match} interactive={false} />}
      </div>
    );
    
    if(block.type === "text") return (
      <div key={key} className="relative flex flex-col">
        <textarea
          className="resize-none outline-none leading-relaxed bg-transparent border-base-300 pr-12 pl-2"
          value={block.type === "text" ? block.content : ""}
          onChange={e => updateTextBlock(key, e.target.value)}
          onFocus={e => {
            setActiveBlockKey(key);
            setCursorAtEnd(
              e.currentTarget.selectionStart === e.currentTarget.value.length
            );
          }}
          onClick={e => {
            setCursorAtEnd(
              e.currentTarget.selectionStart === e.currentTarget.value.length
            );
          }}
          onKeyUp={e => {
            setCursorAtEnd(
              e.currentTarget.selectionStart === e.currentTarget.value.length
            );
          }}
        />

        {activeBlockKey === key && cursorAtEnd && (
          <button
            className="
              absolute right-2 p-2 px-3 text-xl
              font-bold btn btn-success bg-base-300
            "
            onClick={() => {
              setPickerTargetKey(key);
              setPickerOpen(true);
            }}
          >
            +
          </button>
        )}
      </div>
    );
    return <div key={key}>알 수 없는 블록 타입</div>;
  };
  const insertBlockAfter = ( targetKey: string, newBlock: AnyEditorBlock ) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.key === targetKey);
      if (idx === -1) return prev;

      const blocksToInsert: AnyEditorBlock[] = [newBlock];

      // 비-text 블록이면 뒤에 text 블록 자동 추가
      if (newBlock.block.type !== "text") {
        blocksToInsert.push(createTextEditorBlock());
      }

      return [
        ...prev.slice(0, idx + 1),
        ...blocksToInsert,
        ...prev.slice(idx + 1),
      ];
    });
  };


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 min-h-[calc(100vh-200px)] bg-base-200 rounded-xl">
      <div className="flex flex-col min-h-[calc(100vh-200px)] p-2">
        <div className="flex flex-col flex-1">
          <div className="flex">
            <h1 className="text-2xl font-bold flex-1">새 글</h1>
            <button className="btn btn-primary p-2 bg-base-100" onClick={() => {returnList()}}>← 목록으로</button>
          </div>
          <div className="mb-4"></div>
          {/* 제목 */}
          <div className="p-2 rounded-xl border border-white/10 flex flex-col flex-1">
            <input
              className="w-full mt-2 text-2xl pl-2 font-semibold outline-none bg-transparent"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={handleTitleChange}
            />
            <div className="divider my-4"></div>
          {/* 블록들 */}
            <div className="flex flex-1 flex-col max-h-[calc(100vh-300px)] overflow-y-auto">
              {blocks.map(renderBlock)}
            </div>

            <BlockPickerPanel
              open={pickerOpen}
              onClose={() => setPickerOpen(false)}
              onSelect={(item: any) => {
                if (!pickerTargetKey) return;
              
                // 지금은 임시 로그
                console.log("선택됨:", item);
                // 이후 단계:
                const newBlock = createPredictionEditorBlock(item);
                insertBlockAfter(pickerTargetKey, newBlock);
              
                setPickerOpen(false);
              }}
            />

          </div>
          <div className="divider my-4"></div>
          <div className="flex mt-2 justify-around">
            {/* 제출 */}
            <button
              onClick={handleSubmit}
              className="btn btn-error px-6 py-2 rounded-lg text-white"
            >
              초기화
            </button>
            <div className="flex-1"></div>
            <button
              onClick={handleSubmit}
              className="btn btn-primary px-6 py-2 rounded-lg text-white"
            >
              게시하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
