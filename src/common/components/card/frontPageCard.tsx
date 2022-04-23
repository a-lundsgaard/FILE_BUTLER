import React, { ReactNode } from 'react'
import Link from 'next/link';

interface Props {
    svg?: ReactNode,
    title: string,
    description: string,
    link: string
}

export default function FrontPageCard({ svg, title, description, link }: Props) {
    return (

        <div className=' cursor-pointer hover:bg-indigo-100  hover:shadow-md group rounded-md p-6 lg:p-10 bg-white ring-1 ring-indigo-200 shadow-md' >
           <Link href={link}>
           <dl className=" sm:block  xl:blockitems-center lg:max-w-xs">
                <div className='mb-4'>
                    {svg}
                </div>
                <div>
                    <dt className="sr-only">Title</dt>
                    <dd className=" font-semibold text-xl md:text-2xl text-slate-900">
                        {title}
                    </dd>
                </div>
                <div>
                    <dt className="sr-only">Description</dt>
                    <dd className="">{description}</dd>
                </div>
            </dl>
            </Link>
        </div>
    )
}
