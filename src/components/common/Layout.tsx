//import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AdminNavbar } from "./Admin/AdminNavbar";
import { Navbar } from "./Navbar";
//import SideContainer from "./SideContainer";
//import NewsViewerDrawer from "../news/NewsViewerDrawer";
import { Outlet } from "react-router-dom";
//import type { NewsDto } from "../../types/NewsDto";

export default function Layout() {
  const {username} = useAuth();
  //const [selectedNews, setSelectedNews] = useState<NewsDto | null>(null);
  return (
    <div className="flex flex-col min-h-screen">
      {username === "admin" ? <AdminNavbar /> : <Navbar />} {/* Temporary admin check, should be removed later */}

      {/* {<NewsViewerDrawer selected={selectedNews} onClose={() => setSelectedNews(null)} />*/}

      <div className="flex flex-1 px-4 lg:px-8 gap-6 mt-4">
        <div className="flex-1">
          <Outlet />
        </div>
        {/* {<SideContainer onPreview={(nw) => setSelectedNews(nw)} />} */}
      </div>
      <div className="h-auto bg-transparent fixed bottom-0 right-0 flex justify-end">
        <div className="flex flex-col m-4 space-y-2">
          <a href="#top" className="btn ml-2">▲</a>
        </div>
      </div>
    </div>
  );
}
