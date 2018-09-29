import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie, imgSize } from '../../models';
import { MovieService } from '../../services/movie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../../services/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent implements OnInit {
  @Input() movie: Movie;
  curentEditedMovie: Movie;
  isTitleTaken: boolean;
  editMode: boolean;
  wantToDelete: boolean;
  movieImgSrc: string;
  trailerPath: SafeResourceUrl;
  isTrailerShown: boolean;

  constructor(private imageService: ImageService,
    private movieService: MovieService,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.movieImgSrc = this.imageService.getImage(imgSize.md, this.movie.photo);
    this.movieService.getMovieTrailer(this.movie.id.toString()).subscribe((data: any) => {
      if (data.results && data.results.length > 0) {
        this.trailerPath = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${data.results[0].key}`);
      }
    });
    this.curentEditedMovie = JSON.parse(JSON.stringify(this.movie));
  }

  toggleEditMode() {
    if (this.isTrailerShown) {
      this.closeTrailer();
    }
    this.editMode = !this.editMode;
  }

  showTrailerWindow() {
    if (this.editMode) {
      this.toggleEditMode();
    }
    this.isTrailerShown = true;
  }

  closeTrailer() {
    this.isTrailerShown = false;
  }

  editMovie(movie: Movie) {
    this.movie.title = movie.title;
    this.movie.year = movie.year
    this.movie.runtime = movie.runtime
    this.movie.genre = movie.genre
    this.movie.director = movie.director
    this.movie.description = movie.description
    this.toggleEditMode();
  }

  showConfirmation() {
    this.wantToDelete = true;
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.movie);
    this.modalService.dismissAll();
    this.wantToDelete = false;

  }

  dismiss() {
    this.modalService.dismissAll();
    this.wantToDelete = false;
  }

}
