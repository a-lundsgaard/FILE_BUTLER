import React from 'react'
import Plus from '../../common/svg/plus'

interface Props {
    className?: string,
    onClick?: React.MouseEventHandler<HTMLSpanElement>
}

export default function ClearBtn({className, onClick}: Props) {
    return (
        <div
            onClick={onClick}
            className= {`flex cursor-pointer material-icons p-1 pr-1 pl-1 rounded-full bg-red-200 text-white font-bold border-black ${className}`} >
            <Plus className='rotate-45' />
        </div>
    )
}
