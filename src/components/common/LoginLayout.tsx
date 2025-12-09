import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export default function LoginLayout() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 px-4 lg:px-8 gap-6 mt-4">
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}