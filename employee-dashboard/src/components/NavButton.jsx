import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"

function NavButton(props) {
    return (
        <>
        <NavLink to={props.to} 
        className={({isActive}) => isActive ? "border-b-3 px-2 border-transparent text-xl flex items-center hover:border-b-blue-500 my-[-8px] border-b-blue-600": "border-b-3 px-2 border-transparent text-xl flex items-center hover:border-b-blue-500 my-[-8px]"}
        >
            {props.label}
        </NavLink>
        </>
    )
}

NavButton.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}

export default NavButton

