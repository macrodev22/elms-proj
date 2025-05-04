import { formatDate } from "../utils"

const PublicHoliday = (props) => {

    const { name, date, remarks } = props

    return (
        <div className="rounded-md bg-blue-200 py-1.5 px-3.5 text-sm flex justify-between mb-2">
            <span className="font-semibold flex-1/3">{ name }</span>
            <span className="font-light flex-1/3">{ remarks }</span>
            <span className="font-semibold">{ formatDate(date) }</span>
        </div>
    )
}

export default PublicHoliday