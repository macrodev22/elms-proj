
function Card(props) {

    return (
        <div className={`rounded-md shadow-md p-4 ${props.isDark ? 'bg-black text-white' : 'bg-white'} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Card