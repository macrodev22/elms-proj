import { createPortal } from "react-dom"

import { XCircleIcon } from "@heroicons/react/24/outline"
import Card from "./Card"


const Backdrop = (props) => {
    const { onClose, dark } = props
    return createPortal(
        (<div className={`fixed top-0 left-0 w-[100vw] h-[100vh] ${dark ? 'bg-[rgba(10,10,10,.95)] backdrop-blur-md': 'bg-[rgba(200,200,200,0.15)]'}`} onClick={onClose}> 
    </div>),
    document.querySelector('#backdrops-container')
    ) 
}

const Overlay = (props) => {
    const { children, onClose, title, closable } = props

    return createPortal(
        <Card className="w-[95%] md:w-[75%] left-[50%] top-6 fixed p-6 transform-[translateX(-50%)] max-h-[95vh] overflow-y-auto">
        <h4 className="font-bold mb-6 flex justify-between text-xl"><span>{title}</span> {closable && <button className="cursor-pointer" onClick={onClose}><XCircleIcon className="size-12 stroke-red-400" /></button>}</h4>
        { children }
        </Card>,
        document.getElementById('modals-container')
    )
}

const Modal =  (props) => {

    const { title, children, onClose, show, dark=false, closable=true  } = props

    const close = e => {
        if(!closable) return 
        onClose(e)
    }

    return (show ? <>
        <Backdrop onClose={close} dark={dark} />
        <Overlay onClose={close} title={title} closable={closable} >{ children }</Overlay>
        </>: <></>)
}

export default Modal