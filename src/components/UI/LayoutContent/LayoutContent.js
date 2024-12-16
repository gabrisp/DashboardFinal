import Link from "next/link";

const LayoutContent = ({children, title ,hideNewButton = false}) => {
    return (
        <div className="w-full min-h-screen px-4 bg-neutral-50 pt-4">
            <div className="flex flex-row items-center justify-between w-full border-b border-neutral-200 pb-2">
            <h6 className="text-xs font-light text-neutral-500 uppercase">{title}</h6>
            {!hideNewButton && <Link href={`/dashboard/${title.toLowerCase()}/nuevo`} className="bg-neutral-900 text-white text-xs font-light px-2 py-1 rounded-md h-[30px] flex items-center justify-center">Nuevo</Link>}
            </div>
            {children}
        </div>
    )
}
export default LayoutContent;