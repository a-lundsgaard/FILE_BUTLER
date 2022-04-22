import React from 'react'

interface Props {
    children: JSX.Element[] | JSX.Element | string
}

export default function MainContainer(props: Props) {
    return (
        <div className="mt-4 max-w-screen sm:mt-10 mx-10 justify-center flex items-center ">
            <div className="p-5 rounded-lg shadow-xl bg-gray-50 min-w-xl ">
                <div className="px-2">
                    {props.children}
                </div>
            </div>
        </div>
    )
}