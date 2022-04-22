import UploadImage from '../modules/extractTextFromImage/extractTextFromImage';


export default function HomePage() {
  return (
    <div>
      {/* <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> */}
      <div className="flex justify-center ">
        <UploadImage />
      </div>
    </div>
  )
}