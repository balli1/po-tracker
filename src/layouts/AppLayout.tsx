import { NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">PO Tracker</h1>
            <p className="text-xs text-gray-500">
              Purchase order tracking and vendor follow-up
            </p>
          </div>

          <nav className="flex gap-4 text-sm font-medium">
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
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  );
}