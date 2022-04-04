
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
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton']

  const [likes, setLikes] = useState<number>(0)

  function handleClick() {
    setLikes(likes + 1)
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />

      <UploadImage/>

      <Link href="/posts/first-post">
        <a>this page!</a>
      </Link>

      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  )
}