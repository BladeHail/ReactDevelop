import { useEffect, useState, type JSX } from "react";
import { api } from "../../api/axiosInstance";
import PollBlockList from "./PollBlockList";
import LiveBlockList from "./LiveBlockList";

type BlockType = "live" | "prediction" | "video";

type BlockPickerPanelProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (type: BlockType, payload: unknown) => void;
};

export default function BlockPickerPanel({
  open,
  onClose,
  onSelect,
}: BlockPickerPanelProps) {
  const [opened, setOpened] = useState<BlockType>("live");
  const [loading, setLoading] = useState(false);

  const [liveItems, setLiveItems] = useState<unknown[]>([]);
  const [pollItems, setPollItems] = useState<unknown[]>([]);

  useEffect(() => {
    if (!open) return;

    setLoading(true);

    const request =
      opened === "live"
        ? api.get("/live-status")
        : opened === "prediction"
        ? api.get("/predictions/matches")
        : Promise.resolve({ data: [] });

    request
      .then((res) => {
        if (opened === "live") setLiveItems(res.data.videos ?? []);
        if (opened === "prediction") setPollItems(res.data);
      })
      .finally(() => setLoading(false));
  }, [open, opened]);

  const listMap: Record<BlockType, JSX.Element> = {
    live: (
      <LiveBlockList
        items={liveItems as any}
        onSelect={(item) => onSelect("live", item)}
      />
    ),
    prediction: (
      <PollBlockList
        items={pollItems as any}
        onSelect={(item) => onSelect("prediction", item)}
      />
    ),
    video: <div>영상 블록 선택 UI(미구현)</div>,
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative w-full bg-base-100 rounded-t-xl p-4">
        <h2 className="font-semibold mb-3">블록 추가</h2>

        <div className="flex justify-around mb-4">
          <button className="btn btn-primary p-2" onClick={() => setOpened("live")}>
            라이브
          </button>
          <button className="btn btn-primary p-2" onClick={() => setOpened("prediction")}>
            매치
          </button>
          <button className="btn btn-primary p-2" onClick={() => setOpened("video")}>
            영상
          </button>
        </div>

        {loading ? <div>로딩 중...</div> : listMap[opened]}
      </div>
    </div>
  );
}
