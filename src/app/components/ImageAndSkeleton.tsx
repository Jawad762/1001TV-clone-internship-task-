import { Category, Movie } from '@/types'
import React, { useState } from 'react'

type Props = {
  movie: Movie,
  portraitCategories: string[]
  category: Category
}

export default function ImageAndSkeleton({ movie, portraitCategories, category }: Props) {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <>
      <img loading='lazy' onLoad={() => setIsLoaded(true)} className="w-full h-full object-cover rounded-lg peer sm:group-hover:rounded-bl-none sm:group-hover:rounded-br-none" src={portraitCategories.includes(category.title) ? movie.portraitImage : movie.landscapeImage} alt="movie thumbnail" />
      <div role="status" className={`w-72 aspect-video rounded-lg animate-pulse bg-gray-700 ${isLoaded && 'hidden'}`}></div>
    </>
  )
}