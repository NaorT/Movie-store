export interface Movie {
    id: number,
    title: string,
    year: string,
    runtime: string,
    genre: string,
    director: string,
    photo: string,
    description: string,
    rating: number
}

export enum SearchType {
    popular = 'popular',
    upcoming = 'upcoming',
    top_rated = 'top_rated'
  }