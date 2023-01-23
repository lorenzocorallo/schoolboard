interface Props extends React.HTMLAttributes<HTMLButtonElement> {

}
function Button({ className, children, ...props }: Props) {
    return (
        <button className={`p-3 rounded-xl cursor-pointer hover:bg-blue-100 dark:hover:bg-slate-700 transition-all outline-none ${className} `} {...props}>
            {children}
        </button>
    )
}

export default Button;
