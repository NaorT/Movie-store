import { Component, ViewChild } from '@angular/core';
import { MovieService } from './services/movie.service';
import { Movie, SearchType, imgSize } from './models';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from './services/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  isTitleTaken: boolean;
  carouselImages: string[];
  trailerPath: SafeResourceUrl;
  isTrailerShown: boolean;
  @ViewChild('movieModal') movieModal: any;
  @ViewChild('newMovieModal') newMovieModal: any;


  constructor(private movieService: MovieService,
    private modalService: NgbModal,
    private imageService: ImageService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.showPopularMovies();
  }

  private setMoviesFromService() {
    this.movieListForView = this.movieService.getMovies();

  }


  showMovies(type: SearchType) {
    this.movieService.getMoviesByType(type).subscribe((data: any) => {
      this.getHeaderBySearchType(type);
      for (const item of data.results) {
        this.movieService.convertAndPush(item);
      }
      this.setMoviesFromService();
    });
  }

  private getHeaderBySearchType(type: SearchType) {
    switch (type) {
      case SearchType.popular: return this.title = 'Popular movies';
      case SearchType.top_rated: return this.title = 'Top rated movies';
      case SearchType.upcoming: return this.title = 'Upcoming movies';
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
    this.modalService.open(this.movieModal, { size: 'lg' });

  }

  exitModal() {
    this.modalService.dismissAll();
  }

  openNewMovieEditor() {
    this.movie = this.movieService.initNewMovie();
    this.modalService.open(this.newMovieModal);
  }

  addNewMovie(movie: Movie) {
    this.isTitleTaken = false;
    this.movieService.addNewMovie(movie);
    this.modalService.dismissAll();
  }

  openTrailerView(movie: Movie) {
    this.isTrailerShown = true;
    this.movieService.getMovieTrailer(movie.id.toString()).subscribe((data: any) => {
      if (data.results && data.results.length > 0) {
        this.trailerPath = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${data.results[0].key}`);
      } else {
        this.trailerPath = undefined;
      }
    });
  }

  closeTrailer() {
    this.isTrailerShown = false;
  }

}


