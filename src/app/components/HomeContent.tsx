'use client'
import { Category } from '@/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Carousel from './Carousel'
import { getMovies } from '../api'

const HomeContent = () => {
  const { data } = useQuery({ queryKey: ['movies'], queryFn: getMovies })
  
  return (
    <section className='flex flex-col gap-14 text-white pt-10 pb-32 _home-gradient overflow-x-hidden'>
      {data?.slice(1).map((category: Category) => (
        <Carousel key={category.title} category={category}/>
      ))}
    </section>
  )
}

export default HomeContent
