import clsx from "clsx"

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
                console.log('sign in')
            }
        }} 
        className={clsx(
            "flex gap-2 px-4 py-2 rounded-lg border border-gray-700 items-center bg-gray-800 hover:shadow hover:bg-gray-900 transition-all duration-200",
            vote===root ? 'bg-green-400' : ''
        )}
        disabled={disabled}
        >
            {children}
            <span>{votes}</span>
        </button>
    )
}