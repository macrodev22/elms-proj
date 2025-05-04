import { formatDate } from '../utils'
import './Announcement.css'


const Announcement = (props) => {
    const { text, author, date } = props

    return (
        <div className="flex flex-col announcement relative ml-2.5 border-b-1 border-b-gray-300 py-2 mb-2">
            <p className="text-base font-light mb-3">{ text }</p>
            <div className="flex text-sm justify-between font-extralight">
                <span>{ author }</span>
                <span>{ formatDate(date) }</span>
            </div>
        </div>
    )
}

export default Announcement