import React from 'react'
import { RiCloseCircleFill } from "react-icons/ri";

const Modal = ({isOpen , onClose , title , children}) => {

    if(!isOpen) return null;

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center w-full h-[calc(100%)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
        <div className='realtive p-4 w-full max-w-2xl max-h-full'>

            <div className='relative bg-white rounded-lg shadow-sm p-2'>
                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200'>
                    <h3 className='text-lg font-medium text-gray-900 '>{title}</h3>
                    <button
                        type='button'
                        className='text-gray-400 bg-transparent hover:bg-blue-50 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center cursor-pointer'
                        onClick={onClose}
                    >
                        <RiCloseCircleFill className='text-xl'/>
                    </button>
                </div>

            <div className='p-4 md:p-5 space-y-4 '>
                {children}
            </div>

            </div>
        </div>
    </div>
  )
}

export default Modal