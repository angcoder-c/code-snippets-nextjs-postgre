import clsx from "clsx"
import customToast from "../ui/customToast"

export default function VoteButton ({
    type,
    children,
    vote,
    votes,
    disabled,
    isLoggedin,
    onClick
}: {
    type: 'up' | 'down',
    vote: number | undefined,
    votes: number,
    disabled: boolean,
    children: React.ReactNode,
    onClick: ()=>void,
    isLoggedin: boolean
}) {
    const root = type === 'up' ? 1 : -1

    return (
        <button 
        onClick={() => {
            if (isLoggedin) { 
                onClick()
            } else {
                customToast("Please sign in to like this snippet")
            }
        }} 
        className={clsx(
            "flex gap-2 px-4 py-2 rounded-lg border font-bold border-gray-700 items-center bg-gray-800 hover:shadow active:shadow hover:bg-gray-900 active:bg-gray-900 transition-all duration-200",
            vote===root ? 'bg-gray-900 shadow-[inset_0px_-10px_20px_-10px_black] hover:bg-white active:bg-white hover:text-gray-800 active:text-gray-800 hover:shadow-none active:shadow-none' : ''
        )}
        disabled={disabled}
        >
            {children}
            <span>{votes}</span>
        </button>
    )
}