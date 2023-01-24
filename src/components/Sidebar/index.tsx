import { MdRefresh } from "react-icons/md";
import Button from "../Button";
import Notifications from "./Notifications";

function Sidebar() {
    return (
        <div className="basis-80 p-3 max-h-screen overflow-y-auto scrollbar flex flex-col gap-4">
            <Notifications />
            <div className="flex-1"></div>
            <div className="pl-3 flex border-[1px] border-slate-400 dark:border-slate-600 rounded-xl items-center justify-between">
                <p>Ultimo aggiornamento: hh:mm</p>
                <Button className=""><MdRefresh size={24} /></Button>
            </div>
        </div>
    )
}
export default Sidebar;
