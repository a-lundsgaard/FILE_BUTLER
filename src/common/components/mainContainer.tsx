import React from 'react'

interface Props {
    children: JSX.Element[] | JSX.Element | string
}

export default function MainContainer(props: Props) {
    return (
        <div className="mt-4 sm:mt-20 mx-10 justify-center flex items-center ">
            <div className="p-5 max-w-screen rounded-lg shadow-xl bg-gray-50 min-w-xl ">
                <div className="px-2">
                {props.children}
                </div>
            </div>
        </div>
    )
}