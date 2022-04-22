import React, { ReactNode, useState } from 'react'
import displayTitleWithoutBreak from '../../../common/helpers/titleWithDots'
import ClearBtn from '../../../common/components/buttons/clearBtn';
import useResponsive from '../../../common/hooks/useResponsive';
import DragIcon from '../../../common/svg/drag';
import { Document, Page, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    DroppableProvided,
    DraggableLocation,
    DraggableStateSnapshot,
    DraggableProvided
} from 'react-beautiful-dnd';
import { userInfo } from 'os';

interface Props {
    //src?: string,
    item: any,
    items: any,
    provided: any,
    index: number,
    onClear?: React.MouseEventHandler<HTMLSpanElement>
    //innerElement: JSX.Element | ReactNode
    //itemStyle: any
}
const grid = 8;


export default function DndPDFCard({ item, items, index, onClear }: Props) {
    const [style, setStyle] = useState('opacity-0');
    const [responsive, isTouchDevice] = useResponsive();


    const getItemStyle = (isDragging: boolean, draggableStyle: any, items: any, index: number): {} => {
        return {
            // some basic styles to make the items look a bit nicer
            userSelect: 'none',
            padding: grid * 2,
            margin: responsive.makeListHorizontal ? `0 ${index === items.length - 1 ? 0 : grid * 2}px 0 0` : `0 0 ${grid}px 0`,
            borderRadius: 10,
            //zIndex: 1,

            //margin: `0 0 ${grid}px 0`,

            // change background colour if dragging
            background: isDragging ? 'lightgreen' : 'white',

            // styles we need to apply on draggables
            ...draggableStyle,
        }
    };

    return (
        <Draggable key={item.id} draggableId={item.id} index={index} >
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <div className='shadow-xl '
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        items,
                        index
                    )}
                    onMouseEnter={e => {
                        setStyle('opacity-100');
                    }}
                    onMouseLeave={e => {
                        setStyle('opacity-0');
                    }}

                >
                    <div className='flex ' >
                        <span className='text-gray-400' >{responsive.makeListHorizontal ? displayTitleWithoutBreak(item.content, 15) : displayTitleWithoutBreak(item.content, 10)}</span>
                        <ClearBtn className={`ml-auto right-0 transition-opacity ease-in-out duration-900 ${!isTouchDevice && style}`} onClick={onClear} />
                    </div>
                    <Document className={'w-20 sm:w-40'} loading={<div className='text-white w-[80px] h-[110px] sm:h-[210px] lg:w-[150px]' >Loading</div>} file={item.src ? item.src : '/Inter_eksamen-2.pdf'}>
                        <Page width={responsive.makeListHorizontal ? 155 : 75}  pageNumber={1} />
                    </Document>

                    {/* {innerElement} */}
                </div>
            )}
        </Draggable>
        // </div>

    )
}
