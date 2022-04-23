import React from 'react'

interface Props {
    children: JSX.Element[] | JSX.Element | string,
    className?: string
}

export default function MainContainer(props: Props) {
    return (
        <div className={` mt-4 max-w-screen sm:mt-20 mx-10 justify-center flex items-center  ${props.className}`}>
            <div className="p-5 lg:p-7 rounded-lg shadow-xl  bg-gray-50 min-w-xl ">
                <div className="px-2 ">
                    {props.children}
                </div>
            </div>
        </div>
    )
}