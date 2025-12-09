import { useState } from "react";
import { Navbar } from "./Navbar";
import SideContainer from "./SideContainer";
import NewsViewerDrawer from "../news/NewsViewerDrawer";
import { Outlet } from "react-router-dom";
import type { NewsDto } from "../../types/NewsDto";

export default function Layout() {
  const [selectedNews, setSelectedNews] = useState<NewsDto | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <NewsViewerDrawer 
        selected={selectedNews}
        onClose={() => setSelectedNews(null)}
      />

      <div className="flex flex-1 px-4 lg:px-8 gap-6 mt-4">
        <div className="flex-1">
          <Outlet />
        </div>
        <SideContainer onPreview={(nw) => setSelectedNews(nw)} />
      </div>
    </div>
  );
}
