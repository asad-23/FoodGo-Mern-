import React from 'react'
import ReactDom from 'react-dom'
import { MdOutlineCancel } from "react-icons/md";


const MODAL_STYLE = 'fixed top-[50%] left-[50%] bg-white translate-x-[-50%] translate-y-[-50%] z-[1000] h-[90vh] w-[90%] p-10 rounded-2xl overflow-y-auto'
const OVERLAY_STYLE = 'fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-[1000]'


export default function Modal({children, onClose}) {
  return ReactDom.createPortal(
    <>
      <div className={OVERLAY_STYLE}>
        <div className={MODAL_STYLE}>
            <button onClick={onClose}> <MdOutlineCancel size={30}/> </button>
            {children}
        </div>
      </div>
    </>,
    document.getElementById('cart-root')
  )
}
