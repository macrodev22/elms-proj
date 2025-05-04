const DaysPending = (props) => {
    const { days = 21 } = props
    return (
        <div className="rounded-md border-2 border-gray-300 flex flex-col w-40 text-center justify-center gap-1.5">
            <p className="text-4xl text-amber-500">{ days }</p>
            <p className="text-lg">days awaiting approval</p>
        </div>
    )
}

export default DaysPending