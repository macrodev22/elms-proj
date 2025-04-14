import PropTypes from "prop-types"

function NavButton(props) {
    return (
        <>
        <a href={props.to} className="border-b-3 px-2 border-transparent text-xl flex items-center hover:border-b-blue-500 my-[-8px]">
            {props.label}
        </a>
        </>
    )
}

NavButton.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}

export default NavButton

