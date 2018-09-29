export interface Movie {
    id: number,
    title: string,
    year: string,
    runtime: string,
    genre: string,
    director: string,
    photo: string,
    description: string,
    rating: number,
}

export enum SearchType {
    popular = 'popular',
    upcoming = 'upcoming',
    top_rated = 'top_rated'
  }

  export enum imgSize {
      xsm = 'w154',
      sm = 'w185',
      md = 'w342',
      lg = 'w500',
      xl = 'w780',
  }
