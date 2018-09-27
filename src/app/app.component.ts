import { Component, ViewChild } from '@angular/core';
import { MovieService } from './services/movie.service';
import { Movie, SearchType } from './models';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movieListForView: Movie[];
  movie: Movie;
  currentEditMovie: Movie;
  title: string;
  @ViewChild('movieModal') movieModal: any;
  @ViewChild('newMovieModal') newMovieModal: any;


  constructor(private movieService: MovieService, private modalService: NgbModal) { }

  ngOnInit() {
    this.showPopularMovies();
  }

  private setMoviesFromService(){
    this.movieListForView = this.movieService.getMovies();
  }


  showMovies(type :SearchType){
    this.movieService.getMoviesByType(type).subscribe((data: any) => {
      console.log(data);
      this.getHeaderBySearchType(type);
      for (const item of data.results) {
        this.movieService.convertAndPush(item);
      }
      this.setMoviesFromService();
    });
  }

  private getHeaderBySearchType(type :SearchType){
    switch(type){
      case SearchType.popular : return this.title = 'Popular movies';  
      case SearchType.top_rated : return this.title = 'Top rated movies';  
      case SearchType.upcoming : return this.title = 'Upcoming movies';  
    }
  }
  
  showPopularMovies() {
    this.showMovies(SearchType.popular);
  }

  showUpcomingMovies() {
    this.showMovies(SearchType.upcoming);
  }

  showTopRatedMovies() {
    this.showMovies(SearchType.top_rated);
  }
  
  showMovieCard(movie: Movie) {
    this.currentEditMovie = movie;
    this.modalService.open(this.movieModal);

  }

  exitModal() {
    this.modalService.dismissAll();
  }

  openNewMovieEditor() {
    this.movie = this.movieService.initNewMovie();
    this.modalService.open(this.newMovieModal);
  }

  addNewMovie(movie: Movie) {
    if (this.movieService.validateMovie(movie)){
      this.movieService.addNewMovie(movie);
      this.modalService.dismissAll();
    } else {
      // not valid ;
    }
  }

}


