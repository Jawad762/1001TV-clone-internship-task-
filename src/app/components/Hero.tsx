'use client'
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import logo from '../../../public/logo 1001.svg'
import { Category, Movie } from "@/types";
import { getMovies } from "../api";

export default function Hero() {
  const [activeMovieIndex, setActiveMovieIndex] = useState(0)

  const { data } = useQuery({ queryKey: ['movies'], queryFn: getMovies })
  const heroData = data?.find((category: Category) => category.type === 'hero') as Category

  if (!data) return (
    <section className="h-full bg-black grid place-items-center z-50">
      <Image alt="logo" height={100} width={200} src={logo}/>
    </section>
  )

  return (
    <section className="h-full max-h-screen text-white flex items-end justify-between _hero-overlay">
      <div className="absolute inset-0 flex flex-row-reverse overflow-hidden">
        {heroData?.videos.map((movie: Movie) => (
          <div style={{ translate: `${100 * activeMovieIndex}%` }} className="h-full w-full flex justify-end items-center lg:items-end flex-grow-0 flex-shrink-0 transition-all duration-700 ease-in-out" key={movie.name}>
            <img className="absolute h-full w-full object-cover object-top" src={movie.bannerImage}/>
            <div className="lg:w-1/2 space-y-6 flex flex-col items-end px-4 md:px-10 pb-10 z-10">
              <h2 className="text-5xl">{movie.name}</h2>
              <h3 className="text-3xl text-slate-400">{movie.genres[0]} | {movie.year}</h3>
              <p className="line-clamp-2 text-2xl text-right">{movie.description}</p>
              <div className="flex items-center gap-2 sm:text-xl">
                <button className="bg-transparent backdrop-blur-2xl rounded-lg px-5 py-2 sm:px-10 sm:py-4 border border-white">الإضافة الى قائمتي +</button>
                <button className="bg-primaryGreen text-black rounded-lg px-5 py-2 sm:px-10 sm:py-4">اشترك الآن</button>
              </div>
            </div>
            <div className="absolute h-full w-full _hero-overlay"></div>
          </div>
        ))}
      </div>
      <div className="rounded-lg backdrop-blur-lg flex flex-row-reverse items-center gap-1 sm:ml-0 p-3 mb-10 mx-4 lg:mx-10 border border-slate-500 z-20">
        {heroData?.videos.map((movie: Movie, i) => (
          <img onClick={() => {
            setActiveMovieIndex(i)
          }} key={movie.name} className={`cursor-pointer max-w-14 sm:max-w-16 lg:max-w-20 xl:max-w-24 aspect-[2/3] object-cover rounded-lg ${activeMovieIndex === i ? 'scale-[1.4] z-10 border border-primaryGreen shadow-md brightness-125' : 'opacity-50 hover:opacity-95'}`} src={movie.portraitImage}/>
        ))}
      </div>
    </section>
  )
}
