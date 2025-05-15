const PieProgress = ({ total=21, used=0,title='Allowance', size=128 }) => {

    const strokeWidth = 6
    const radius = Math.floor((size/2)-(1*strokeWidth))
    const circumference = 2*Math.PI*radius

    return (
        <div className={`flex flex-col w-[${size}]px`}>
            <div className={`w-[${size}px] h-[${size}px] relative`}>
                <div className="absolute flex flex-col gap-1.5 w-full h-full items-center justify-center">
                    <span className="text-gray-400 text-sm">
                        Days
                    </span>
                    <p>
                        <span className="text-white text-2xl">
                            {used}
                        </span>
                        <span className="text-gray-400 text-sm"> /{total}</span>
                    </p>
                </div>
                <svg width={size} height={size} >
                    <circle cx={size/2} cy={size/2} r={radius} stroke="#f1f1f3" strokeWidth={strokeWidth} fill="none" />
                    <circle cx={size/2} cy={size/2} r={radius} stroke="#ad7ee9" strokeWidth={strokeWidth} fill="none" 
                    strokeDasharray={circumference} strokeDashoffset={(1 - (used/total))*circumference} 
                    strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
                </svg>
            </div>
            <p className="text-lg text-center">{title}</p>
        </div>
    )
}

export default PieProgress