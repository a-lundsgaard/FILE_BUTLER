import React from 'react'

interface Props {
    className?: string,
}

export default function Plus({className}: Props) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" strokeLinecap="round" strokeWidth="2" stroke="#fff" fill="none" strokeLinejoin="round">
            <desc>Upload your file and transform it.</desc>
            <path d="M10 1.833v16.333"></path>
            <path d="M1.833 10h16.333"></path>
        </svg>
    )
}
