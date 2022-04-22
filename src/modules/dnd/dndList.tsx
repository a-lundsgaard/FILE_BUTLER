import React, { Component, useEffect, useState } from 'react';
import DndCard from './dndCard';
import displayTitleWithoutBreak from '../../common/helpers/titleWithDots';
import useResponsive from '../../common/hooks/useResponsive';
import { Document, Page, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


import { IItem } from './dndTypes';
import {
    DragDropContext,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd';


// fake data generator
const getItems = (count: number): IItem[] =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

// a function to help us reordering the result
const reorder = (list: IItem[], startIndex: number, endIndex: number): IItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;

interface Props {
    onItemChange?: (items: IItem[]) => void,
    onMergedPdfUrlChange: (url: string) => void,
    mergedUrl: string
    parentItems?: IItem[],
}


export default function DndList({ onItemChange, onMergedPdfUrlChange, parentItems, mergedUrl }: Props) {

    const startItems = parentItems || getItems(3)
    const [items, setItems] = useState<IItem[]>(startItems);
    const [orderedItems, setOrderedItems] = useState<IItem[]>(items);

    const [responsive, isTouchDevice] = useResponsive();

    const defaultEmptyUrl = '';
    const [mergedPdfUrl, setMergedPdfUrl] = useState<string>(defaultEmptyUrl);

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid * 2,
        display: responsive.makeListHorizontal ? 'flex' : 'block',
        borderRadius: 10,
        overflow: 'auto',
        marginBottom: 20,
    });


    useEffect(() => {
        if (items && onItemChange) {
            onItemChange(items);
        }
    }, [items])

    useEffect(() => {
        if (parentItems) {
            setItems(parentItems)
        }
    }, [parentItems])

    useEffect(() => {
        setMergedPdfUrl(mergedUrl)
    }, [mergedUrl])

    useEffect(() => {
        onMergedPdfUrlChange(mergedPdfUrl);
    }, [mergedPdfUrl])


    
    const onDragEnd = (result: DropResult) => {
        setMergedPdfUrl('')
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items2 = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        setItems(items2);
    }

    const handleRemove = (list: IItem[], index: number) => {
        setMergedPdfUrl(defaultEmptyUrl);
        const result = Array.from(list);
        result.splice(index, 1)
        setItems(result);
    }



    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <Droppable droppableId="droppable"
                //direction="horizontal"
                direction={responsive.makeListHorizontal ? "horizontal" : "vertical"}

            >
                {(provided, snapshot) => (
                    <div
                        className='max-h-[60vh] sm:max-w-xl lg:max-w-3xl xl:max-w-6xl 2xl:max-w-full'
                        ref={provided.innerRef}
                        style={{
                            ...getListStyle(snapshot.isDraggingOver),
                        }}

                        {...provided.droppableProps}
                    >
                        {items.map((item, index) => (
                            <DndCard
                                item={item}
                                items={items}
                                provided={provided}
                                index={index}
                                onClear={() => handleRemove(items, index)}
                                key={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}