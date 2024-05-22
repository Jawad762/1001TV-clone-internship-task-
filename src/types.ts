export type Category = {
    videos: Movie[]
    type: string
    title: string
    orientation: string
}

export type Movie = {
    name: string
    description: string
    genres: string[]
    year: string
    portraitImage: string
    bannerImage: string
    landscapeImage: string
}