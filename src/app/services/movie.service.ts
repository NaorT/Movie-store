import { Injectable } from '@angular/core';
import { Movie , SearchType } from '../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// const API_KEY: string = '9bf472f00f24a33c253c48c4111f8f9a';
// const BASE_URL: string = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=2`


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = []
  constructor(private http: HttpClient) { }

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
      photo: `https://image.tmdb.org/t/p/w154/${movieFromServer.poster_path}`,
      runtime: movieFromServer.runtime,
      title: movieFromServer.title,
      year: movieFromServer.release_date,
      rating: movieFromServer.vote_average
    }
  }

  
  private getDirector(crew: any[]): string {
    return crew.find((crewMember) => {
      return crewMember.job === 'Director';
    }).name;
  }

  deleteMovie(movie: Movie){
    this.movies.splice(this.movies.indexOf(movie),1);
  }

  addNewMovie(movie: Movie){
    this.seNewMovie(movie);
    this.movies.push(movie);
  }

  initNewMovie():Movie{
    return {
      description:undefined,
      director:undefined,
      genre:undefined,
      id:undefined,
      photo:undefined,
      rating:undefined,
      runtime:undefined,
      title:undefined,
      year:undefined,
    } 
  }

  validateMovie(movie: Movie){
    if(!movie || !movie.title){
      return false;
    }

    for(let currentMovie of this.movies){
      if(currentMovie.title === movie.title){
        return false;
      }
    }
    return true;
  }

  getMovieById(movieId: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9bf472f00f24a33c253c48c4111f8f9a&append_to_response=credits`)
  }

  getMoviesByType(type: SearchType) {
    console.log(type);
    return this.http.get(`https://api.themoviedb.org/3/movie/${type}?api_key=9bf472f00f24a33c253c48c4111f8f9a`);
  }

  seNewMovie(movie: Movie): Movie {
    movie.id = 1;
    movie.rating = 9;
    movie.runtime = '130',
      movie.photo = "https://image.tmdb.org/t/p/w154/3IGbjc5ZC5yxim5W0sFING2kdcz.jpg";
    return movie;
  }



  checkIfTitleExist(movie: Movie, movieArray: Movie[]) {

  }
}
