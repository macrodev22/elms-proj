const LeaveStat = (props) => {
    const { type = 'Annual leave', size = 214, total = 21, used = 0 } = props

    const strokeWidth = 10
    const radius = (size/2)-strokeWidth
    const circumference = 2*Math.PI*radius 


    return (
        <div className="flex flex-col gap-2 items-center">
            <h3 className="font-light text-xl">{ type }</h3>
            <div className="w-[215px] h-[215px]">
                <svg width={215} height={215}>
                    <circle cx={size/2} cy={size/2} r={radius} fill="none" strokeWidth={strokeWidth} stroke="#EADCFA" />
                    <circle cx={size/2} cy={size/2} r={radius} fill="none" strokeWidth={strokeWidth} stroke="#AD7EE9" strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={(1-(used/total))*circumference}
                    transform={`rotate(-90 ${size/2} ${size/2})`}
                    />
                </svg>
            </div>
        </div>
    )
}

export default LeaveStat