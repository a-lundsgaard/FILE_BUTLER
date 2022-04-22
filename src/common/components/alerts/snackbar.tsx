import React, { useEffect, useState } from 'react'


interface Props {
    type: {
        msg: string
        severity: 'error' | 'succes' | 'warn' | string,
        id: number,
    }
}
    const getColor = (s: string) => {
        return {
            "error": 'bg-red-500',
            "succes": 'bg-green-500',
            "warn": 'bg-yellow-500'
        }[s] || 'green'
    }


export default function ErrorSnack2({ type }: Props) {

    const visible = 'show', inVisible = '';
    const [show, setShow] = useState(inVisible);
    const [color, setColor] = useState(getColor(type.severity))

    useEffect(() => {
        if (!type.msg) return;
        setColor(getColor(type.severity));        
        setShow(visible)
        const timeOut = setTimeout(() => {
            setShow(inVisible)
        }, 2700)
        return () => {
            clearTimeout(timeOut) // cleanup function firing on unmount
        }
        
    }, [type.id])



    return (
        <div className={`${show} ${color} shadow-xl`} id="snackbar">
            <div className='ml-auto' >{type.msg || 'some message '}</div>
            <svg
                onClick={() => setShow(inVisible)}
                className={`fill-current h-6 w-6 text-white ml-auto`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
        </div>
    )
}
