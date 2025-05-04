import PropTypes from "prop-types"
import { TrashIcon } from "@heroicons/react/24/outline"


const IconButton = (props) => {

    return (
        <button className="cursor-pointer px-3.5 py-1.5 rounded-md border-1 ">
            { props.type == 'delete' && <TrashIcon className="size-6" /> }
        </button>
    )
}

IconButton.propTypes = {
    type: PropTypes.string.isRequired
}

export default IconButton