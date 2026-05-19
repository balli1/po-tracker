import { NavLink, Outlet } from "react-router-dom";
import northwellLogo from "../assets/northwell-logo.png";

interface AppLayoutProps {
  onLogout: () => void;
}

export function AppLayout({ onLogout }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={northwellLogo}
              alt="Northwell Health"
              className="h-8 w-auto shrink-0 object-contain"
            />

            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-gray-900">
                PO Tracker
              </h1>
              <p className="truncate text-xs text-gray-500">
                Purchase Order Management
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <NavLink
              to="/dispatched"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }
            >
              Dispatched POs
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }
            >
              Dashboard
            </NavLink>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}