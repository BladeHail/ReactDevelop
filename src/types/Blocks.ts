export interface Block{
    id: string;
    type: string;
}

export interface TextBlock extends Block{
    type: "text";
  content: string;
};
