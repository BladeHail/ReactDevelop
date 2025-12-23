import { type VideoResponseDto } from "../../types/VideoResponseDto";

interface VideoBlockProps {
  video: VideoResponseDto;
}

export default function VideoBlock({ video }: VideoBlockProps) {
  return (
    <div 
      className={`flex flex-col bg-base-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group`}
      onClick={() => console.log(`${video.videoId} 재생`)}
    >
      <div className={`relative aspect-video rounded-md overflow-hidden bg-base-300`}>
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform`}
        />
      </div>
      <div className={`mt-3`}>
        <h3 className={`font-semibold line-clamp-2 text-base-content`}>
          {video.title}
        </h3>
        <p className={`text-sm text-base-content/50 mt-1`}>YouTube • Paralympic Studio</p>
      </div>
    </div>
  );
}