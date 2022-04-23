import Link from 'next/link';
import { useState } from 'react';
import { navLinks } from './navLinks';
import { useRouter } from 'next/router';
import MenuIcon from '../../svg/drag';
import Logo from '../../svg/hamburgerMenuSvg';
import Plus from '../../svg/plus';



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
                            <Logo/> 
                            <span className='text-xl text-white font-bold uppercase tracking-wide'>
                                File butler
                            </span>
                        </a>
                    </Link>
                </div>

                <button
                    className=' inline-flex p-3 mr-3 hover:bg-indigo-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
                    onClick={handleClick}
                >
                    { !active ? <MenuIcon /> : <Plus className='rotate-45' /> }
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