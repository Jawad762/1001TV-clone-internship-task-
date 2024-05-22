import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { Category, Movie } from '@/types';
import { getMovies } from '../api';

const SearchModal = ({ showModal }: { showModal: boolean }) => {

    const [searchValue, setSearchValue] = useState('')
    const { data } = useQuery({ queryKey: ['movies'], queryFn: getMovies })
    const allMovies = data?.find((category: Category) => category.title === 'الاكثر مشاهدة') as Category
    const filteredMovies = allMovies?.videos.slice(0,10).filter(movie => movie.name.startsWith(searchValue))

  return (
    <section className={`flex flex-col fixed bg-[#010028] py-20 sm:pt-32 pb-1 px-4 sm:px-10 inset-0 z-30 transition-all duration-700 text-white ${showModal ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className='flex justify-between items-center gap-3 sm:gap-6'>
            <span className='font-extrabold text-primaryGreen sm:text-3xl'>الرجوع</span>
            <div className='bg-slate-700 flex-1 flex justify-end items-center gap-1 rounded-lg p-2 sm:p-3 sm:text-2xl'>
                <input onChange={(e) => setSearchValue(e.target.value)} className='bg-transparent text-end flex-1 outline-none' placeholder='...ابحث'/>
                <CiSearch className="cursor-pointer"/>
            </div>
        </div>
        <p className='text-3xl font-extrabold text-end mt-10 mb-3'>الأكثر بحثا</p>
        {filteredMovies?.length > 0 ? (
            <div className='grid gap-3 _search-layout overflow-y-auto'>
            {filteredMovies.map((movie: Movie) => (
            <div className="h-full w-full rounded-lg" key={movie.name}>
                <img className="h-full w-full object-cover rounded-lg" src={movie.landscapeImage}/>
            </div>
            ))}
            </div>
        ) : (
            <p className='text-slate-700 font-extrabold text-4xl text-center mt-10'>عذرا، لم نجد ما بحثت عنه</p>
        )}
    </section>
  )
}

export default SearchModal