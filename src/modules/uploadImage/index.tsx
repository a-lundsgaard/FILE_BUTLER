import Textarea from "../../common/components/elements/textarea";
import ImagePlaceholder from "./imagePlaceholder";
import React, { useState, useEffect } from 'react'
import { useUploadForm } from "../../common/hooks/useUploadForm";
import ProgressBar from '../../common/components/elements/progressBar';
import ClearBtn from "./clearBtn"
import DotLoader from "../../common/components/elements/dotLoader";
import MainContainer from '../../common/components/mainContainer'
import ErrorSnack from '../../common/components/alerts/errorSnack'


interface ImgState {
    src: string,
    alt: string,
    file: File | null
}

export default function UploadImage() {

    const [{ alt, src, file }, setImg] = useState<ImgState>({
        src: '',
        alt: 'Upload an Image',
        file: null
    });

    const [textareaValue, setTextareaValue] = useState('');
    const [copyBtnText, setCopyBtnText] = useState('Copy text')
    const [textareaTitle, setTextareaTitle] = useState<string | JSX.Element>('Extracted text')
    const [displayClearBtn, setdisplayClearBtn] = useState<boolean>(false)
    const [msg, setMsg] = useState('')

    //http://localhost:8080
    const { uploadForm, progress } = useUploadForm('https://ocr-api-1.herokuapp.com/' + "image");

    const handleImgChange = (e: any) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setImg({
                src: URL.createObjectURL(file),
                alt: file.name,
                file: file
            });

        }
    }

    const handleDelete = () => {
        setImg({
            src: '',
            alt: 'Upload an image',
            file: null
        });
        setTextareaValue('');
        setCopyBtnText('Copy text')
        setdisplayClearBtn(false)
    }

    const handleUploadImage = async (file: File) => {
        setTextareaTitle(<DotLoader title="Extracting text" />
        )

        const formdata = new FormData();
        const serverFileName = 'IMG-' + Date.now();
        formdata.append("productImage", file, serverFileName);
        uploadForm(formdata)
            .then(({ data }) => {
                setTextareaValue(data.text)
                setTextareaTitle('Extracted text')
                setdisplayClearBtn(true)
            })
            .catch(error => console.log('error', error));
    };

    const handleOnCopyClick = () => {
        if (!textareaValue) return;
        navigator.clipboard.writeText(textareaValue)
        setCopyBtnText('Copied to clipboard!')
        setTimeout(() => {
            setCopyBtnText('Copy text')
        }, 2000);
    }

    useEffect(() => {
        if (file) {
            handleUploadImage(file);
        }
    }, [src])


    return (
        <div>
        <MainContainer>
            <>
                <div className="">
                    {/* <label className="inline-block mb-2 text-gray-400 font-bold">File upload</label> */}
                    <h3 className='font-bold text-2xl text-gray-600 mb-2 ' >Extract text</h3>
                    <h4 className='text-xl mb-4 text-gray-400' >Upload and extract text from any image</h4>

                    {displayClearBtn && <div
                        className="ml-auto right-0 flex"
                        onClick={handleDelete}><ClearBtn />
                    </div>}
                </div>
                <div className="flex items-center justify-center">
                    {file ? <img
                        className="max-h-[20vh] xl:max-w-sm"
                        src={src}
                        alt={alt}
                    /> : <ImagePlaceholder onChange={handleImgChange} accept="image/png" description="Upload image"  />}
                </div>
                <Textarea placeholder="" value={textareaValue} title={<span className="text-xl text-gray-400">{textareaTitle}</span>} />

                <div className="flex justify-center">
                    <button
                        className={`w-full px-4 py-2 text-white ${copyBtnText != 'Copy text' && "bg-blue-400"} ${textareaValue ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-300 cursor-default"} rounded shadow-xl`}
                        onClick={handleOnCopyClick}
                    >{copyBtnText}
                    </button>
                </div>
            </>
            
        </MainContainer>
        </div>

    )
}