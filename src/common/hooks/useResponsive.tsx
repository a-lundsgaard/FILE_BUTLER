
import React, { useState, useEffect } from 'react'

interface IOptions{
    rearrange: boolean,
    makeListHorizontal: boolean,
}

export default function useResponsive(customBreakpoint = 700) : [IOptions, boolean] {
    const [width, setWindowWidth] = useState(0)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
        updateDimensions();
        setIsTouchDevice(window.ontouchstart !== undefined)
        window.addEventListener('resize', updateDimensions);
        return () =>
            window.removeEventListener('resize', updateDimensions);
    }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }
    const responsive = {
        rearrange: width > customBreakpoint,
        makeListHorizontal: width > 640, // sm breakpoint in tailwind
    }

    return [responsive, isTouchDevice]
}

