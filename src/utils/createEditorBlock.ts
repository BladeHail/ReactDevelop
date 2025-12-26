import type { LiveBlock, PredictionBlock, TextBlock, VideoBlock } from "../types/Blocks";
import type { EditorBlock } from "../types/EditorBlocks";
import type { LiveDto } from "../types/LiveDto";
import type { MatchDto } from "../types/MatchDto";
import type { VideoResponseDto } from "../types/VideoResponseDto";

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

export function createLiveEditorBlock(
  live: LiveDto
): EditorBlock<LiveBlock> {
  return {
    key: crypto.randomUUID(),
    block: {
      id: "",
      type: "live",
      live,
    },
  };
}

export function createVideoEditorBlock(
  video: VideoResponseDto
): EditorBlock<VideoBlock> {
  return {
    key: crypto.randomUUID(),
    block: {
      id: "",
      type: "video",
      video: video,
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