import type { MatchDto } from "./MatchDto";

export interface Block{
    id: string;
    type: string;
}

export interface TextBlock extends Block{
    type: "text";
  content: string;
};

export interface PredictionBlock extends Block{
    type: "prediction";
    match: MatchDto | null;
};
