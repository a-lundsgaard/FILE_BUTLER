import UploadImage from '../modules/uploadImage/uploadImage';

export default function HomePage() {
  return (
    <div>
      <div className="flex justify-center">
        <UploadImage />
      </div>
    </div>
  )
}