import type { NewsDto } from "../types/NewsDto";

export default function NewsPage({news} : {news: NewsDto}) {
    return(<>{news.description}</>);
}