import UploadImage from '../modules/extractTextFromImage/extractTextFromImage';
import MainContainer from '../common/components/mainContainer';
import FrontPageCard from '../common/components/card/frontPageCard';
import PdfmergeSvg from '../common/svg/pdfmergeSvg';
import ImageToTextSvg from '../common/svg/imageToTextSvg';


export default function HomePage() {


  return (
    <div className="pb-20 ">
      <div className="text-center inline " >
        <section className="text-white pb-20 lg:pb-40 pt-8 sm:pt-20 px-10 bg-gradient-to-b from-indigo-800 to-indigo-500 " >
          <h1 className='font-semibold text-5xl' > Every tool you need to work with files</h1>
          <h2 className='text-xl mt-2' >A website to merge PDF files and extract text from images. It is a 100% free tool to use.</h2>
        </section>
      </div>
      <MainContainer className='-mt-10 sm:-mt-8 lg:-mt-[80px]'>
        <section>
          <div className="bg-slate-50 p-2  
        grid grid-cols- sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 text-sm leading-6">
            <FrontPageCard svg={<PdfmergeSvg />} title={'Merge PDF'} description={"Combine PDF's in the order that you want with the easiest PDF merger available"} />
            <FrontPageCard svg={<ImageToTextSvg />} title={'Extract text from image'} description={"Extract text from any image by uploading them"} />
          </div>
        </section >
      </MainContainer>
    </div>
  )
}

