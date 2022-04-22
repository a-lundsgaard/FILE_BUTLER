import { ReactNode, useState } from "react";

interface Props {
    message: string,
    children: JSX.Element | string
}

export default function Tooltip({ message, children }: Props) {

    const [style, setStyle] = useState('opacity-0');

    return (
        <div className="relative flex flex-col items-center  ">
            <span className="flex"
                onMouseEnter={e => {
                    setStyle('opacity-100');
                }}
                onMouseLeave={e => {
                    setStyle('opacity-0')
                }}
            >
                {children}
            </span>
            <div className={`transition-opacity ease-in-out duration-600 absolute bottom-0 flex flex-col items-center mb-4  mr-[170px] ${style} whitespace-nowrap cursor-default`}>
                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">{message}</span>
                {/* <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div> */}
                <div className="arrow w-4 h-4 ml-[90px] -mt-[21px] rotate-45 bg-gray-600"></div>
            </div>
        </div>
    );
};