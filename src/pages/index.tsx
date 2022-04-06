
import { useState } from 'react'
import Link from 'next/link'
import UploadImage from '../modules/uploadImage/uploadImage';

interface Props {
  title: string
}

function Header({ title }: Props) {
  return <h1>{title ? title : 'Default title'}</h1>
}

//import "../styles/globals.css";


export default function HomePage() {

  return (
    <div>
      <div className="flex justify-center">
        <UploadImage />
      </div>

      {/* <Link href="/posts/first-post">
        <a>this page!</a>
      </Link> */}
    </div>
  )
}