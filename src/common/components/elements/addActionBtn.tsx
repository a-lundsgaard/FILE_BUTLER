import React from 'react'
import PlusIcon from '../../svg/plus'
import useResponsive from '../../hooks/useResponsive'

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    count?: number;
}

export default function AddActionBtn({ onChange, count }: Props) {
    const [responsive, isTouchDevice] = useResponsive();

    return (
        <label className={` mb-1 bg-blue-500 ${ !isTouchDevice && "hover:bg-black"} outline-none click:bg-black font-bold p-3 rounded-full cursor-pointer group shadow-lg flex`}>
            <span className='absolute -mt-[21px] -ml-[21px] border-2 border-blue-500  font-bold bg-black text-white text-xs p-1 pr-2 pl-2 rounded-full'>{count ?? 1}</span>
            <PlusIcon className={ !isTouchDevice ? `group-hover:rotate-180 transition-rotate ease-in-out duration-200` : '' } /> 
            <input
                hidden
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={onChange}
                value=''
            />
        </label>
    )
}
