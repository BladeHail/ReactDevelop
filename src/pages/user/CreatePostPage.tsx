import { useState } from "react";
import type { Block, TextBlock } from "../../types/Blocks";
//import { api } from "../../api/axiosInstance";

type EditorBlock<T extends Block = Block> = {
  key: string;   // 프런트 전용 (React key)
  block: T;
};


const createEditorTextBlock = (): EditorBlock<TextBlock> => ({
  key: crypto.randomUUID(),
  block: {
    id: "",               // 서버 전송 전에는 비워둬도 무방
    type: "text",
    content: "",
  },
});


export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<EditorBlock<TextBlock>[]>([
    createEditorTextBlock(),
  ]);

  /* 제목 */
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  /* text 내용 변경 */
  const updateTextBlock = (key: string, content: string) => {
    setBlocks(prev =>
      prev.map(b =>
        b.key === key
          ? { ...b, block: { ...b.block, content } }
          : b
      )
    );
  };

  /* text 블록 추가 */
  const addTextBlock = () => {
    setBlocks(prev => [...prev, createEditorTextBlock()]);
  };

  /* text 블록 삭제 */
  const removeBlock = (key: string) => {
    setBlocks(prev => prev.filter(b => b.key !== key));
  };

  /* 저장 */
  const handleSubmit = async () => {
    const payload = {
      title: title.trim(),
      blocks: blocks
        .map(b => b.block)
        .filter(
          b =>
            b.type !== "text" ||
            b.content.trim().length > 0
        ),
    };

    console.log("POSTing /posts", payload);
    // await api.post("/posts", payload);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-base-200 rounded-xl">
        <h1 className="text-2xl font-bold">새 글</h1>
      {/* 제목 */}
      <input
        className="w-full text-2xl font-semibold outline-none border-b pb-2 bg-transparent"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={handleTitleChange}
      />

      {/* 블록 에디터 */}
      <div className="space-y-4">
        {blocks.map(({ key, block }) => (
          <div key={key} className="space-y-2">
            <textarea
              className="w-full min-h-[360px] resize-none outline-none leading-relaxed bg-transparent border-base-300 textarea-bordered textarea"
              placeholder="내용을 입력하세요"
              value={block.content}
              onChange={e =>
                updateTextBlock(key, e.target.value)
              }
            />

            {blocks.length > 1 && (
              <button
                onClick={() => removeBlock(key)}
                className="text-sm text-red-500"
              >
                이 블록 삭제
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 블록 추가 */}
      <button
        onClick={addTextBlock}
        className="px-4 py-2 rounded-lg border"
      >
        텍스트 블록 추가
      </button>

      {/* 제출 */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white"
        >
          게시하기
        </button>
      </div>
    </div>
  );
}
