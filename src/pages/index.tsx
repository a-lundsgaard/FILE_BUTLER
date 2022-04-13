import UploadImage from '../modules/uploadImage/uploadImage';

export default function HomePage() {
  return (
    <div className='bg-gradient-to-t from-cyan-500 to-blue-500 h-screen '>
      <div className="flex justify-center ">
        <UploadImage />
      </div>
    </div>
  )
}