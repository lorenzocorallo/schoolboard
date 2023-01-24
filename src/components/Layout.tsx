import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="flex-1 h-full flex py-3">
            <div className="bg-slate-100 dark:bg-slate-700 rounded p-5 flex flex-1">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;
