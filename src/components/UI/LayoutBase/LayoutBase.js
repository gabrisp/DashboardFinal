
export default function LayoutBase({ title, list, children, asideWidth = "w-2/6" }) {
    return (
        <>
        <div className={`${asideWidth} mh-screen p-4 border-r bg-neutral-50 border-neutral-200 top-0`}>
            <div className="text-ml font-bold flex items-center justify-start">
                {title}
            </div>      
            {list}
        </div>
        <div className="w-4/6 min-h-screen px-4 bg-neutral-50">
            {children}
        </div>
        </>
    )
}
