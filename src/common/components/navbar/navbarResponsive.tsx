import Link from 'next/link';
import { useState } from 'react';
import { navLinks } from './navLinks';
import { useRouter } from 'next/router';
import DragIcon from '../../svg/drag';



export default function NavbarResponsive() {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    const { asPath, pathname } = useRouter();
    const navBarColor = 'bg-indigo-500'

    return (
        <>
            <nav className={`flex items-center flex-wrap shadow-md ${navBarColor}`}>
                <div className='p-3' >
                    <Link href='/'>
                        <a className='inline-flex items-center p-2 mr-4 '>
                            <svg
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                                className='fill-current text-white h-8 w-8 mr-2'
                            >
                                <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
                            </svg>
                            <span className='text-xl text-white font-bold uppercase tracking-wide'>
                                File butler
                            </span>
                        </a>
                    </Link>
                </div>

                <button
                    className=' inline-flex p-3 mr-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
                    onClick={handleClick}
                >
                    <DragIcon />
                </button>
                {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
                <div
                    className={`${active ? '' : 'hidden'
                        }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
                >
                    <div
                        onMouseLeave={() => setActive(false)}
                        className={`z-50 shadow-md lg:shadow-none ${navBarColor} fixed lg:relative lg:inline-flex lg:flex-row lg:ml-auto  lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto`}>
                        {navLinks.map((link, index) => {
                            return <Link href={link.path} key={index} >
                                <a className={` ${pathname === link.path && "bg-indigo-400"} lg:mr-2 lg:inline-flex lg:w-auto w-full px-3 py-3 lg:rounded text-white font-bold items-center justify-center hover:bg-indigo-700 hover:text-white`} key={index}>{link.name}</a>
                            </Link>
                        })
                        }
                    </div>
                </div>
            </nav>
        </>
    );
};