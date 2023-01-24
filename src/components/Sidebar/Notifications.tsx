import { useEffect, useState } from "react";
import { MdArrowDownward, MdArrowUpward, MdAssignment, MdNotifications } from "react-icons/md";
import Button from "../Button";

export default function Notifications() {
    /* fake content to style */
    const [nots] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
    const [groups, setGroups] = useState<number[][]>([]);
    const [divideBy, _setDivideBy] = useState<number>(3);
    const [activeIdx, setActiveIdx] = useState<number>(0);
    useEffect(() => {
        setGroups([]);
        for(let i = 0; i < nots.length / divideBy; i++) {
            let s = nots.slice(divideBy*i, divideBy+(divideBy*i));
            setGroups(p => ([...p, s]));
        }
    }, [nots, divideBy])

    return(
        <div>
            <p className="bg-slate-100 dark:bg-slate-700 rounded p-3 text-xl flex items-center gap-1">
                <MdNotifications /> Ultime notifiche
            </p>

            <div className="flex pt-4 gap-2 min-h-[14rem]">
                <div className="flex flex-col flex-1 gap-3">
                    {groups[activeIdx] && groups[activeIdx].map(n => <Item key={n} text={n.toString()} />)}
                </div>
                <div className="rounded bg-slate-100 dark:bg-slate-700 flex flex-col justify-between items-center gap-1">
                    <Button onClick={() => setActiveIdx(v => v-1)} className={`p-1 ${activeIdx > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}><MdArrowUpward size={20} /></Button>
                    <div className="flex flex-col gap-2">
                        {groups.map((_v, i) => <div key={`dot-${i}`} className={`w-1 h-1 rounded-full border-[1px] border-white ${i === activeIdx ? "bg-white" : "bg-transparent"}`}></div>)}
                    </div>
                    <Button onClick={() => setActiveIdx(v => v+1)} className={`p-1 ${activeIdx < (groups.length - 1) ? "opacity-100" : "opacity-0 pointer-events-none"}`}><MdArrowDownward size={20} /></Button>
                </div>
            </div>
        </div>
    )
}

function Item({type, text}: {text: string, type?: string }) {
    let icon = <MdNotifications />
    if (type === "something-really-great-in-this-moment") {
        icon = <MdAssignment />
    }
    return (
        <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded flex-1">
            <p className="text-md flex items-center">{icon ?? <MdNotifications />} {type ?? "Notifica"}</p>
            <p>notification {text}</p>
        </div>
    )
}
