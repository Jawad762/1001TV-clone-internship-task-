'use client'
import { Category } from "@/types";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import AutoHeight from 'embla-carousel-auto-height'
import AutoScroll from 'embla-carousel-auto-scroll'

const Carousel = ({ category }: { category: Category }) => {

    const pluginsArray = window.innerWidth > 650 ? [AutoScroll({ playOnInit: false, startDelay: 10 }), AutoHeight()] : [AutoScroll({ playOnInit: false, startDelay: 10 })]

    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        align: "start",
        direction: 'rtl',
        loop: false,
        skipSnaps: false,
        inViewThreshold: 0.7,
        slidesToScroll: 4,
        dragFree: true
     },pluginsArray);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
      }, [emblaApi])
    
      const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
      }, [emblaApi])

      const [selectedIndex, setSelectedIndex] = useState(0);
      const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    
      const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
      );
    
      const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
      }, [emblaApi, setSelectedIndex]);
    
      useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
      }, [emblaApi, setScrollSnaps, onSelect]);
      
      const startAutoplay = useCallback(() => {
        const autoScroll = emblaApi?.plugins()?.autoScroll as any
        if (!autoScroll) return
        autoScroll.play()
      }, [emblaApi])

      const stopAutoplay = useCallback(() => {
        const autoScroll = emblaApi?.plugins()?.autoScroll as any
        if (!autoScroll) return
        autoScroll.stop()
      }, [emblaApi])

      const portraitCategories = ['الاكثر مشاهدة', 'دراما كلاسيكية', 'برامج كوميدية']
      
    return category.type !== 'banner' ? (
        <section className="flex flex-col items-end gap-3 group hover:z-40 pr-4 md:pr-10">
            <div className="flex w-full items-center justify-between pl-4 md:pl-10">
                <div className="opacity-0 group-hover:opacity-100 flex items-center justify-center mt-5" dir="rtl">
                    {scrollSnaps.map((_, idx) => (
                        <button
                        className={`w-1.5 h-0.5 sm:w-6 sm:h-2 rounded-full ml-2 ${
                            idx === selectedIndex ? "bg-primaryGreen" : "bg-gray-700"
                        }`}
                        key={idx}
                        onClick={() => scrollTo(idx)}
                        />
                    ))}
                </div>
                <h2 className='font-extrabold text-2xl ml-auto text-end'>{category.title}</h2>
            </div>
            <div className="relative min-w-full flex items-center justify-center" dir="rtl" ref={emblaRef}>
                <div className="flex items-start gap-2" dir="rtl">
                    {category.videos?.map((movie) => {
                    return (
                        <div className={`_slide overflow-hidden max-w-48 ${portraitCategories.includes(category.title) ? 'max-w-40 sm:max-w-56 ' : 'max-w-48 sm:max-w-72'} cursor-pointer rounded-lg sm:hover:scale-125 transition-transform ease-in-out duration-100 group hover:z-40 border-2 border-transparent hover:border-primaryGreen`} dir="rtl" key={movie.name}>
                            <img className="w-full h-full object-cover rounded-lg peer sm:group-hover:rounded-bl-none sm:group-hover:rounded-br-none" src={portraitCategories.includes(category.title) ? movie.portraitImage : movie.landscapeImage} alt="movie thumbnail" />
                            <article className="w-full bg-gray-700 p-0 h-0 sm:peer-hover:h-24 sm:peer-hover:p-2 hover:h-24 hover:p-2 z-40 overflow-hidden transition-[height] ease-in-out duration-200 space-y-0.5 rounded-br-lg rounded-bl-lg">
                                <h3 className="font-extrabold line-clamp-1">{movie.name}</h3>
                                <h4 className="opacity-[0.7] text-xs">{movie.genres[0]}</h4>
                                <p className="text-xs line-clamp-2">{movie.description}</p>
                            </article>
                        </div>
                    );
                    })}
                </div>
                <button onClick={scrollNext} onMouseEnter={startAutoplay} onMouseLeave={stopAutoplay} className={`absolute inset-y-0 left-4 text-5xl place-items-center text-white hidden ${'group-hover:grid'}`}><IoIosArrowBack/></button>
                <button onClick={scrollPrev} className={`absolute inset-y-0 right-4 text-5xl place-items-center text-white hidden ${selectedIndex !== 0 && 'group-hover:grid'}`}><IoIosArrowForward/></button>
            </div>
        </section>
      ) : (
        <section className="flex items-center justify-between gap-3 p-4 md:p-10 _green-blue-gradient">
            <div className="group w-4/6 hover:z-40 overflow-hidden">
                <div className="opacity-0 group-hover:opacity-100 flex items-center justify-end mb-5" dir="rtl">
                    {scrollSnaps.map((_, idx) => (
                        <button
                            className={`w-6 h-2 rounded-full ml-2 ${
                                idx === selectedIndex ? "bg-primaryGreen" : "bg-gray-700"
                            }`}
                            key={idx}
                            onClick={() => scrollTo(idx)}
                        />
                    ))}
                </div>
                <div className="relative w-full flex items-center justify-center" dir="rtl" ref={emblaRef}>
                    <div className="flex items-start gap-2">
                        {category.videos?.map((movie) => {
                        return (
                            <div className="_slide max-w-56 cursor-pointer rounded-lg border-2 border-transparent hover:border-primaryGreen" dir="rtl" key={movie.name}>
                                <img className="w-full object-cover rounded-lg" src={movie.portraitImage} alt="movie thumbnail" />
                            </div>
                        );
                        })}
                    </div>
                    <button onClick={scrollNext} onMouseEnter={startAutoplay} onMouseLeave={stopAutoplay} className={`absolute inset-y-0 left-4 text-5xl place-items-center text-white hidden ${'group-hover:grid'}`}><IoIosArrowBack/></button>
                    <button onClick={scrollPrev} className={`absolute inset-y-0 right-4 text-5xl place-items-center text-white hidden ${selectedIndex !== 0 && 'group-hover:grid'}`}><IoIosArrowForward/></button>
                </div>
            </div>
            <div className='flex flex-col items-end gap-4 w-1/3'>
                <h2 className='font-extrabold text-xl md:text-4xl text-primaryGreen text-end'>{category.title}</h2>
                <button className="bg-primaryGreen rounded-lg px-3 py-1 md:px-6 md:py-4 md:text-xl">تصفح الكل</button>
            </div>
        </section>       
      )
}

export default Carousel


