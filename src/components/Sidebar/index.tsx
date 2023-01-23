import { useEffect, useState } from "react";
import { MdArrowDownward, MdArrowUpward, MdNotifications, MdRefresh } from "react-icons/md";
import Button from "../Button";

function Notification({text}: {text: string}) {
    return (
        <div className="border-[1px] p-3 rounded flex-1">
            <p>notification {text}</p>
        </div>
    )
}

function NotificationList() {
    let nots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    const [groups, setGroups] = useState<number[][]>([]);
    const [activeIdx, setActiveIdx] = useState<number>(0);
    useEffect(() => {
        setGroups([]);
        for(let i = 0; i < nots.length / 3; i++) {
            let s = nots.slice(3*i, 3+(3*i));
            setGroups(p => ([...p, s]));
        }
    }, [])

    return(
        <div className="flex pt-4 gap-1 min-h-[14rem]">
            <div className="flex flex-col flex-1 gap-4">
                {groups[activeIdx] && groups[activeIdx].map(n => <Notification key={n} text={n.toString()} />)}
            </div>
            <div className="flex flex-col justify-between items-center gap-1">
                <Button onClick={() => setActiveIdx(v => v-1)} className={`p-1 ${activeIdx > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}><MdArrowUpward size={20} /></Button>
                <div className="flex flex-col gap-2">
                    {groups.map((_v, i) => <div className={`w-1 h-1 rounded-full border-[1px] border-white ${i === activeIdx ? "bg-white" : "bg-transparent"}`}></div>)}
                </div>
                <Button onClick={() => setActiveIdx(v => v+1)} className={`p-1 ${activeIdx < (groups.length - 1) ? "opacity-100" : "opacity-0 pointer-events-none"}`}><MdArrowDownward size={20} /></Button>
            </div>
        </div>
    )
}

function Sidebar() {
    return (
        <div className="basis-80 p-3 max-h-screen overflow-y-auto scrollbar flex flex-col gap-4">
            <div className="dark:bg-slate-700 rounded-xl p-3">
                <p className="text-xl flex items-center gap-1"><MdNotifications />Ultime notifiche</p>
                <NotificationList />
            </div>
            <div className="flex-1"></div>
            <div className="pl-3 flex border-[1px] dark:border-slate-600 rounded-xl items-center justify-between">
                <p>Ultimo aggiornamento: hh:mm</p>
                <Button className=""><MdRefresh size={24} /></Button>
            </div>
        </div>
    )
}
export default Sidebar;
