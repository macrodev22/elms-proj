import { createPortal } from "react-dom"

import { XCircleIcon } from "@heroicons/react/24/outline"
import Card from "./Card"


const Backdrop = (props) => {
    const { onClose } = props
    return createPortal(
        (<div className="fixed top-0 left-0 bg-[rgba(33,33,33,.95)] w-[100vw] h-[100vh] modal" onClick={onClose}> 
    </div>),
    document.querySelector('#backdrops-container')
    ) 
}

const Overlay = (props) => {
    const { children, onClose, title } = props

    return createPortal(
        <Card className="w-[75%] left-[50%] top-6 absolute transform-[translateX(-50%)]">
        <h4 className="font-bold mb-6 flex justify-between text-xl"><span>{title}</span> <button className="cursor-pointer" onClick={onClose}><XCircleIcon className="size-12 stroke-red-400" /></button></h4>
        { children }
        </Card>,
        document.getElementById('modals-container')
    )
}

const Modal =  (props) => {

    const { title, children, onClose, show  } = props

    return (show ? <>
        <Backdrop onClose={onClose} />
        <Overlay onClose={onClose} title={title} >{ children }</Overlay>
        </>: <></>)
}

export default Modal