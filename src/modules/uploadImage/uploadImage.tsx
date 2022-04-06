import Textarea from "../../common/components/elements/textarea";
import ImagePlaceholder from "./imagePlaceholder";
import React, { useState, useEffect } from 'react'
import { useUploadForm } from "./hooks";
import ProgressBar from '../../common/components/elements/progressBar';
//import ClearBtn from './ClearBtn';
import ClearBtn from "./clearBtn"


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
    const [textareaTitle, setTextareaTitle] = useState('Extracted text')


    const { uploadForm, progress } = useUploadForm('http://localhost:8080/' + "image");


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

    }

    const handleUploadImage = async (file: File) => {
        setTextareaTitle('Extracting text...')
        const formdata = new FormData();
        const serverFileName = 'IMG-' + Date.now();
        formdata.append("productImage", file, serverFileName);
        uploadForm(formdata)
            .then(({ data }) => {
                setTextareaValue(data.text)
                setTextareaTitle('Extracted text')

            })
            .catch(error => console.log('error', error));
    };

    const handleOnCopyClick = () => {
        if (!file) return;
        navigator.clipboard.writeText(textareaValue)
        setCopyBtnText('Copied to clipboard!')
    }

    useEffect(() => {
        if (file) {
            handleUploadImage(file);
        }
    }, [src])




    return (
        <div className="flex justify-center mt-8">
            <div className="p-5 max-w-2xl rounded-lg shadow-xl bg-gray-50">
                <div className="m-4">

                    <div className="flex">
                        <label className="inline-block mb-2 text-gray-400 font-bold">File upload</label>
                        {file && <div
                            className="ml-auto mr-2 right-0"
                            onClick={handleDelete}><ClearBtn/>
                        </div>}
                    </div>
                    <div className="flex items-center justify-center w-full">
                        {file ? <img
                            className="max-w-xs"
                            src={src}
                            alt={alt}
                        /> : <ImagePlaceholder src={src} alt={alt} onChange={handleImgChange} />}
                    </div>
                    {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
                    <Textarea placeholder="" value={textareaValue} title={textareaTitle} />



                </div>
                <div className="flex justify-center p-2">
                    <button
                        className={`w-full px-4 py-2 text-white ${copyBtnText != 'Copy text' && "bg-blue-400"} ${file ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-300 cursor-default"} rounded shadow-xl`}
                        onClick={handleOnCopyClick}
                    >{copyBtnText}
                    </button>
                </div>
            </div>
        </div>
    )
}