import type { PredictionBlock, TextBlock } from "../types/Blocks";
import type { EditorBlock } from "../types/EditorBlocks";
import type { MatchDto } from "../types/MatchDto";

export function createPredictionEditorBlock(
  match: MatchDto
): EditorBlock<PredictionBlock> {
  return {
    key: crypto.randomUUID(),
    block: {
      id: "",
      type: "prediction",
      match,
    },
  };
}

export function createTextEditorBlock(): EditorBlock<TextBlock>{
  return {key: crypto.randomUUID(),
    block: {
      id: "",               // 서버 전송 전에는 비워둬도 무방
      type: "text",
      content: "",
    },
  };
}
