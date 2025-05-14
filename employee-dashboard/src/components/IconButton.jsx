import PropTypes from "prop-types"
import { TrashIcon } from "@heroicons/react/24/outline"


const IconButton = ({type = 'delete'}) => {

    return (
        <button className="cursor-pointer px-3.5 py-1.5 rounded-md border-1 border-red-500 hover:bg-red-400 hover:[&_svg]:stroke-white">
            { type == 'delete' && <TrashIcon className="size-6 stroke-red-500 "  /> }
        </button>
    )
}

IconButton.propTypes = {
    type: PropTypes.string.isRequired
}

export default IconButton