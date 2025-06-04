
const LeaveTypeStat = ({used = 0, total = 21, type='Annual Leave', size=160, strokeWidth=6, strokeColor='#ad7ee9'}) => {

    const radius = Math.floor(size/2 - strokeWidth)
    const circumference = 2 * Math.PI * radius
    return (
        <div className="flex flex-col gap-4 items-center">
            <h5 className="truncate">{ type }</h5>
            <div className="relative">
                <div className="absolute w-full h-full flex items-center justify-center">
                    <p className="text-xl text-gray-500"><span className="text-6xl text-black">{ used }</span> / {total}</p>
                </div>
                <svg width={size} height={size} className="rotate-[-90deg]">
                    <circle cx={size/2} cy={size/2} r={radius} strokeWidth={strokeWidth} stroke="#f1f3f3" fill="none" />
                    <circle cx={size/2} cy={size/2} r={radius} strokeWidth={strokeWidth} stroke={strokeColor} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={Math.min((1-(used/total))*circumference, (1 - 0.01)*circumference) } />
                </svg>
            </div>
        </div>
    )
}

export default LeaveTypeStat