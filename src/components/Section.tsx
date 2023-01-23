function Section({children, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex-1 h-full flex py-3">
            <div className="bg-slate-200 dark:bg-slate-700 rounded-xl p-5 flex flex-1"  {...props}>
                {children}
            </div>
        </div>
    )
}

export default Section;
