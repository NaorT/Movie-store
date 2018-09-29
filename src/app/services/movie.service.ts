import { Injectable } from '@angular/core';
import { Movie, SearchType, imgSize } from '../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ImageService } from './image.service';

const API_KEY: string = '?api_key=9bf472f00f24a33c253c48c4111f8f9a';
const BASE_URL: string = `https://api.themoviedb.org/3/movie`
const DEFAULT_IMAGE: string = '3IGbjc5ZC5yxim5W0sFING2kdcz.jpg';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = []
  constructor(private http: HttpClient, private imageService: ImageService) { }

  public getMovies(): Movie[] {
    return this.movies;
  }

  public setMovies(movies: Movie[]): void {
    this.movies = movies;
  }

  public convertAndPush(movieToConvert: any) {
    this.movies = [];
    this.getMovieById(movieToConvert.id).subscribe((movieWithExtendedData: any) => {
      let convertedMovie: Movie = this.convertMovieFromServer(movieWithExtendedData);
      this.movies.push(convertedMovie);
    });
  }


  private convertMovieFromServer(movieFromServer: any): Movie {
    return {
      description: movieFromServer.overview,
      director: this.getDirector(movieFromServer.credits.crew),
      genre: movieFromServer.genres[0].name,
      id: movieFromServer.id,
      photo: movieFromServer.poster_path,
      runtime: movieFromServer.runtime,
      title: movieFromServer.title,
      year: movieFromServer.release_date,
      rating: movieFromServer.vote_average,
    }
  }


  private getDirector(crew: any[]): string {
    return crew.find((crewMember) => {
      return crewMember.job === 'Director';
    }).name;
  }

  deleteMovie(movie: Movie) {
    this.movies.splice(this.movies.indexOf(movie), 1);
  }

  addNewMovie(movie: Movie) {
    this.setNewMovie(movie);
    this.movies.push(movie);
  }

  initNewMovie(): Movie {
    return {
      description: undefined,
      director: undefined,
      genre: undefined,
      id: undefined,
      photo: undefined,
      rating: undefined,
      runtime: undefined,
      title: undefined,
      year: undefined,
    }
  }

  validateMovie(movie: Movie): boolean {
    for (let currentMovie of this.movies) {
      if (currentMovie.title === movie.title && currentMovie.id !== movie.id) {
        return false;
      }
    }
    return true;
  }

  getMovieById(movieId: number): Observable<any> {
    return this.http.get(`${BASE_URL}/${movieId}${API_KEY}&append_to_response=credits`)
  }

  getMoviesByType(type: SearchType): Observable<any> {
    return this.http.get(`${BASE_URL}/${type}${API_KEY}`);
  }

  getMovieTrailer(movieId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/${movieId}/videos${API_KEY}`);
  }

  setNewMovie(movie: Movie): Movie {
    movie.id = Math.floor(Math.random() * 100) + this.movies.length;
    movie.rating = Math.floor(Math.random() * 10) + 1;
    movie.runtime = '130',
      movie.photo = DEFAULT_IMAGE;
    return movie;
  }

}
