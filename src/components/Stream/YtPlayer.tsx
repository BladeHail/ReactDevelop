import YouTube from 'react-youtube';

export default function YtPlayer({videoId} : {videoId : string}) {
  return (
    <div className="flex justify-center w-full rounded-xl p-4 bg-base-100">
      <YouTube
        className="flex"
        videoId={videoId}
        opts={{
          playerVars: {
            autoplay: 1,
          }
        }}
      />
    </div>
  );
}
