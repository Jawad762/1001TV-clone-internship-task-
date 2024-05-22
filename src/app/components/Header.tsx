'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import logo from '../../../public/logo 1001.svg'
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch, CiGlobe } from "react-icons/ci";
import SearchModal from './SearchModal';
import { VscAccount } from "react-icons/vsc";
import Link from 'next/link';

const Header = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 5) setIsScrolling(true)
      else setIsScrolling(false)
    })
  },[])

  return (
    <>
    <header className={`fixed top-0 inset-x-0 flex items-center justify-between px-4 md:px-10 py-4 z-50 text-white text-xl ${isScrolling ? 'backdrop-blur-md bg-black/40' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
            <button className="relative group">
                <VscAccount className='text-2xl md:text-3xl'/>
                <ul className='min-w-32 divide-y-2 text-end text-sm rounded-lg space-y-2 bg-gray-700/95 shadow-lg absolute -bottom-2 translate-y-full h-0 overflow-hidden p-0 group-focus-within:h-32 group-focus-within:p-3 transition-[height]'>
                    <li>قائمتي</li>
                    <li className='pt-2'>معلومات حسابك</li>
                    <li className='pt-2'>تسجيل خروج</li>
                </ul>
            </button>
            <button className="relative hidden lg:flex items-center gap-2 border border-transparent hover:border-white hover:backdrop-blur-md focus:border-white focus:backdrop-blur-md p-2 rounded-lg group">
                <IoIosArrowDown/>
                <span>عربي</span>
                <CiGlobe/>
                <ul className='divide-y-2 text-end text-sm rounded-lg space-y-2 bg-gray-700/95 shadow-lg absolute -bottom-2 inset-x-0 translate-y-full h-0 overflow-hidden p-0 group-focus-within:h-20 group-focus-within:p-3 transition-[height]'>
                    <li>عربي</li>
                    <li className='pt-2'>English</li>
                </ul>
            </button>
            <CiSearch className="text-2xl md:text-3xl cursor-pointer" onClick={() => setShowModal(!showModal)}/>
        </div>
        <div className="items-center gap-14 font-extrabold hidden lg:flex">
            <Link href={'/'}><span>اطفال</span></Link>
            <Link href={'/'}><span>وثائقيات</span></Link>
            <Link href={'/'}><span>برامج</span></Link>
            <Link href={'/'}><span>مسلسلات</span></Link>
            <Link href={'/'}><span className='text-primaryGreen'>الرئيسية</span></Link>
            <Image alt="logo" height={50} width={100} src={logo} priority/>
        </div>
        <Image alt="logo" height={35} width={70} src={logo} className='lg:hidden' priority/>
    </header>
    <SearchModal showModal={showModal}/>
    </>
  )
}

export default Header