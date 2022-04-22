import React, { Component, useEffect, useState } from 'react';
import PDFMerger from 'pdf-merger-js/browser';
import AddActionBtn from '../../common/components/elements/addActionBtn';
import Tooltip from '../../common/components/elements/toolTip';
import ImagePlaceholder from '../../common/components/elements/imagePlaceholder';
import DndList from './dnd/dndList';
import { IItem } from './dnd/dndTypes'
import useResponsive from '../../common/hooks/useResponsive';
import ErrorSnack from '../../common/components/alerts/snackbar';


export default function DndPDFList() {

    const defaultEmptyUrl = '';
    const [items, setItems] = useState<IItem[]>([]);
    const [mergedPdfUrl, setMergedPdfUrl] = useState<string>(defaultEmptyUrl);
    const [responsive, isTouchDevice] = useResponsive();
    const [msg, setMsg] = useState({msg: '', severity: 'succes', id: 1})


    useEffect(() => {

        console.log('CHANGED URL TO', mergedPdfUrl);

    }, [mergedPdfUrl])

    const handleFileUpload = (e: any) => {
        if (e.target.files[0]) {
            setMergedPdfUrl(defaultEmptyUrl);
            const file = e.target.files[0];
            const result = Array.from(items).filter(f => f.file)
            result.push({
                id: `${Date.now()}`,
                content: file.name,
                file: file,
                src: URL.createObjectURL(file)
            })
            setItems(result)
        }
    }

    const handleMerge = async (files: IItem[]) => {
        console.log('Pushed');
        
        try {
            console.log('Pushed 2');

            const merger = new PDFMerger();

            for (const item of files) {
                if (item.file) {
                    await merger.add(item.file)
                }
            }
            console.log('Pushed 3');

            const mergedPdf = await merger.saveAsBlob();

            console.log('Pushed 4');

            const url = URL.createObjectURL(mergedPdf)
            setMergedPdfUrl(url)

        } catch (error: any) {
            
            setMsg({msg: error.message, severity: 'error', id: msg.id+1})
            console.log('Found error', error);
        }
    }

    const handleMerge2 = () => {
        handleMerge(items).then( r => r).catch(error => console.log(error));


    }

    const handleMergedUrlChange = (url: string) => {
        console.log(url);
        setMergedPdfUrl(url)
    }

    return (

        <div className='h-full '>
            {!items.length ?
                <ImagePlaceholder onChange={handleFileUpload} description='Upload PDF' accept="application/pdf" >
                    <h3 className='font-bold text-2xl text-gray-600  mb-2' >Merge PDF files</h3>
                    <h4 className='text-xl mb-6 text-gray-400' >Combine PDFs in the order you want with the easiest PDF merger available</h4>
                </ImagePlaceholder>
                :
                <>
                    <div className='flex mb-4' >
                        <h3 className='font-bold text-2xl mt-2 mr-6 text-gray-600' >Merge PDF</h3>
                        <div className='ml-auto right-0 mb-1'>
                            {
                                isTouchDevice ? <AddActionBtn onChange={handleFileUpload} count={items.length} />
                                    : <Tooltip message="Add more files">
                                        <AddActionBtn onChange={handleFileUpload} count={items.length} />
                                    </Tooltip>
                            }
                        </div>
                    </div>
                    <DndList onItemChange={setItems} onMergedPdfUrlChange={(url) => handleMergedUrlChange(url)} mergedUrl={mergedPdfUrl} parentItems={items} />
                    <div className='flex'>
                        <div className='mx-auto'>
                            {items.length > 1 && <button
                                onClick={() => handleMerge2() }
                                className='lg:mb-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer shadow-xl'
                            >Merge PDF</button>}
                            {mergedPdfUrl && <a
                                className={'lg:mb-5 ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'}
                                href={mergedPdfUrl} download={'merged.pdf'}>Download</a>
                            }
                        </div>
                    </div>
                </>
            }
            {/* <ErrorSnack type={{ msg: 'wronngg', severity: 'error' }} /> */}

        </div>
    );
}