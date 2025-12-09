export interface BoardDto {
    id: number,
    title: string,
    content: string,
    author: string,
    media: string | null,
    createdAt: string,
    updatedAt: string,
    views: number
}