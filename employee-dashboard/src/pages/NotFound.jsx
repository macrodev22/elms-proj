import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="mx-12">
            <p>Oopps!, Page not found!</p>
            <p className="text-2xl">
                Go <Link to='/' className="text-blue-400">Home</Link>
            </p>
        </div>
    )
}

export default NotFound