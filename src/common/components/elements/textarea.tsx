import React, { useState, useEffect } from 'react'

interface Props {
  placeholder: string,
  value: string,
  title: string | JSX.Element
}

export default function Textarea({ placeholder, value, title }: Props) {

  return (
    <div className="space-y-0 mb-4 mt-7 ">
      <label className="form-label inline-block mb-4">
        {title}
      </label>
      <textarea
        readOnly
        className={`ring-1  ${ value != '' && "h-[20vh] ring-blue-500 ring-2"} resize-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 border-0 focus:bg-white focus:border-blue-500 focus:outline-none`}
        id="exampleFormControlTextarea1"
        rows={3}
        placeholder={placeholder}
        value={value}
      ></textarea>
    </div>
  )
}
