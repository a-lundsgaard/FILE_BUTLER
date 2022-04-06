import React, {useState, useEffect} from 'react'

interface Props {
  placeholder: string,
  value: string,
  title: string
}

export default function Textarea({ placeholder, value, title }: Props) {

  //const [value, setValue] = useState<string>('');

  // const handleChange = (v:string) => {
  //   console.log(v);
  //   setValue(v);
  // }


  return (
      <div className="space-y-0 mb-3 mt-5 xl:w-96">
        <label className="form-label inline-block mb-2 text-gray-400 font-bold"
        >{title}
        </label>
        <textarea
          readOnly
          className="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleFormControlTextarea1"
          rows={3}
          placeholder={placeholder}
          //onChange={ (e) => handleChange(e.target.value) }
          value={value}
        ></textarea>
      </div>
  )
}
