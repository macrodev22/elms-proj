import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"

function NavButton({to, label, badge = null}) {
    return (
        <>
        <NavLink to={to} 
        className={({isActive}) => isActive ? "border-b-3 px-2 relative border-transparent text-xl flex items-center hover:border-b-blue-500 my-[-8px] border-b-blue-600": "border-b-3 relative px-2 border-transparent text-xl flex items-center hover:border-b-blue-700 my-[-8px]"}
        >
            { badge && <span className="absolute bg-red-400 text-white text-sm px-2 py-0.5 top-1 right-[-5px] rounded-full">{badge.count}</span> }
            {label}
        </NavLink>
        </> 
    )
}

NavButton.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    badge: PropTypes.object
}

export default NavButton

