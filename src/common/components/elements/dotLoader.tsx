import React, { useEffect, useState } from 'react'

interface Props {
  title: string
}

export default function DotLoader({ title }: Props) {
  const [dots, setDots] = useState<string>("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevVal => {
        if (prevVal.length > 2) return "";
        return prevVal + "."
      })
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {title + dots}
    </>
  )
}
